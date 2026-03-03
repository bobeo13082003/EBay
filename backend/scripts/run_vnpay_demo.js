require('dotenv').config();
const vnpayController = require('../src/controllers/vnpay');

async function run() {
  // Ensure sandbox env defaults if not set
  process.env.VNPAY_URL = process.env.VNPAY_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  process.env.VNPAY_TMN_CODE = process.env.VNPAY_TMN_CODE || 'R8KNSKEL';
  process.env.VNPAY_HASH_SECRET = process.env.VNPAY_HASH_SECRET || '4I3E5OMTVBLRAAY2TK3QK5AU44AZJVYA';
  process.env.VNPAY_RETURN_URL = process.env.VNPAY_RETURN_URL || 'http://localhost:9999/api/vnpay/return';

  const req = {
    body: {
      amount: 50000,
      orderId: 'DEMO_' + Date.now(),
      orderInfo: 'Demo payment from script',
      ipAddr: '127.0.0.1',
    },
    ip: '127.0.0.1',
  };

  const res = {
    json(obj) {
      console.log('\nGenerated payment data:');
      console.log(JSON.stringify(obj, null, 2));
      if (obj.paymentUrl) {
        console.log('\nOpen the following URL in a browser to continue to VNPay (sandbox):');
        console.log(obj.paymentUrl);
      }
      return obj;
    },
    status(code) {
      return { json: (o) => console.log('Error', code, o), send: (s) => console.log('Error', code, s) };
    },
  };

  await vnpayController.createPayment(req, res);
}

run().catch((e) => console.error(e));
