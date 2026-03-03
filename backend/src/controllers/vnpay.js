const crypto = require('crypto');
const querystring = require('qs');

exports.createPayment = async (req, res) => {
  try {
    const {
      amount,
      orderId,
      orderInfo,
      ipAddr,
      bankCode,
    } = req.body;

    const vnpUrl = process.env.VNPAY_URL; // e.g. https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
    const vnpTmnCode = process.env.VNPAY_TMN_CODE;
    const vnpHashSecret = process.env.VNPAY_HASH_SECRET;
    const vnpReturnUrl = process.env.VNPAY_RETURN_URL; // where VNPay redirects after payment

    if (!vnpUrl || !vnpTmnCode || !vnpHashSecret || !vnpReturnUrl) {
      return res.status(500).json({ message: 'VNPay not configured on server' });
    }

    const date = new Date();
    const createDate = date
      .toISOString()
      .replace(/[-:]/g, '')
      .slice(0, 14);

    const ip = ipAddr || req.ip || '127.0.0.1';

    const vnpParams = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: vnpTmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId || Date.now().toString(),
      vnp_OrderInfo: orderInfo || 'Payment for order',
      vnp_OrderType: 'other',
      vnp_Amount: String(Number(amount) * 100), // VNPay expects amount in smallest currency unit
      vnp_ReturnUrl: vnpReturnUrl,
      vnp_IpAddr: ip,
      vnp_CreateDate: createDate,
    };

    if (bankCode) {
      vnpParams.vnp_BankCode = bankCode;
    }

    // sort params
    const sorted = {};
    Object.keys(vnpParams)
      .sort()
      .forEach(function (key) {
        sorted[key] = vnpParams[key];
      });

    const signData = querystring.stringify(sorted, { encode: false });
    const hmac = crypto.createHmac('sha512', vnpHashSecret);
    const vnpSecureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    const query = querystring.stringify({ ...sorted, vnp_SecureHash: vnpSecureHash }, { encode: true });
    const paymentUrl = `${vnpUrl}?${query}`;

    return res.json({ paymentUrl });
  } catch (err) {
    console.error('VNPay createPayment error', err);
    return res.status(500).json({ message: 'Create payment failed' });
  }
};

exports.ipn = async (req, res) => {
  try {
    const vnpHashSecret = process.env.VNPAY_HASH_SECRET;
    if (!vnpHashSecret) return res.status(500).send('VNPay not configured');

    const vnpParams = req.query || {};
    const secureHash = vnpParams.vnp_SecureHash;
    if (!secureHash) return res.status(400).send('Missing vnp_SecureHash');

    const inputData = { ...vnpParams };
    delete inputData.vnp_SecureHash;
    delete inputData.vnp_SecureHashType;

    const sorted = {};
    Object.keys(inputData)
      .sort()
      .forEach(function (key) {
        sorted[key] = inputData[key];
      });

    const signData = querystring.stringify(sorted, { encode: false });
    const hmac = crypto.createHmac('sha512', vnpHashSecret);
    const checksum = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (checksum === secureHash) {
      const vnpTxnRef = vnpParams.vnp_TxnRef;
      const vnpResponseCode = vnpParams.vnp_ResponseCode;

      console.log('VNPay IPN valid', { vnpTxnRef, vnpResponseCode });

      // Update order in DB (create if missing)
      try {
        const Order = require('../models/order');
        const amount = vnpParams.vnp_Amount ? Number(vnpParams.vnp_Amount) / 100 : undefined;
        const status = vnpResponseCode === '00' ? 'paid' : 'failed';

        await Order.findOneAndUpdate(
          { txnRef: vnpTxnRef },
          {
            txnRef: vnpTxnRef,
            amount,
            status,
            vnpResponseCode,
            raw: vnpParams,
            paidAt: vnpResponseCode === '00' ? new Date() : undefined,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } catch (e) {
        console.error('Failed to update Order for IPN', e);
      }

      return res.json({ RspCode: '00', Message: 'Success' });
    }

    console.warn('VNPay IPN invalid signature', { expected: checksum, received: secureHash });
    return res.status(400).json({ RspCode: '97', Message: 'Invalid signature' });
  } catch (err) {
    console.error('VNPay IPN error', err);
    return res.status(500).json({ RspCode: '99', Message: 'Server error' });
  }
};

exports.returnUrl = async (req, res) => {
  try {
    const vnpHashSecret = process.env.VNPAY_HASH_SECRET;
    if (!vnpHashSecret) return res.status(500).send('VNPay not configured');

    const vnpParams = req.query || {};
    const secureHash = vnpParams.vnp_SecureHash;

    const inputData = { ...vnpParams };
    delete inputData.vnp_SecureHash;
    delete inputData.vnp_SecureHashType;

    const sorted = {};
    Object.keys(inputData)
      .sort()
      .forEach(function (key) {
        sorted[key] = inputData[key];
      });

    const signData = querystring.stringify(sorted, { encode: false });
    const hmac = crypto.createHmac('sha512', vnpHashSecret);
    const checksum = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    const isValid = secureHash && checksum === secureHash;

    // You can redirect to frontend with result params. Configure `VNPAY_RETURN_FRONTEND` in env.
    const frontendUrl = process.env.VNPAY_RETURN_FRONTEND || 'http://localhost:5173/payment-result';
    const redirectUrl = `${frontendUrl}?${querystring.stringify({ ...vnpParams, valid: isValid })}`;

    return res.redirect(redirectUrl);
  } catch (err) {
    console.error('VNPay returnUrl error', err);
    return res.status(500).send('Server error');
  }
};
