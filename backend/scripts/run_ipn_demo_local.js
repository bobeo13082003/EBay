require('dotenv').config();
const crypto = require('crypto');
const qs = require('qs');
const connectDb = require('../src/config/db');
const vnpayController = require('../src/controllers/vnpay');

async function formatDate(date) {
  return date.toISOString().replace(/[-:]/g, '').slice(0, 14);
}

async function run() {
  // ensure env
  process.env.VNPAY_TMN_CODE = process.env.VNPAY_TMN_CODE || 'R8KNSKEL';
  process.env.VNPAY_HASH_SECRET = process.env.VNPAY_HASH_SECRET || '4I3E5OMTVBLRAAY2TK3QK5AU44AZJVYA';

  // connect to DB so Order model works
  await connectDb();

  const params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: process.env.VNPAY_TMN_CODE,
    vnp_TxnRef: 'DEMO_LOCAL_' + Date.now(),
    vnp_OrderInfo: 'Local IPN demo',
    vnp_Amount: String(25000 * 100),
    vnp_ResponseCode: '00',
    vnp_CreateDate: await formatDate(new Date()),
  };

  const sorted = {};
  Object.keys(params).sort().forEach(k => (sorted[k] = params[k]));
  const signData = qs.stringify(sorted, { encode: false });
  const hmac = crypto.createHmac('sha512', process.env.VNPAY_HASH_SECRET);
  const vnp_SecureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  const fullParams = { ...sorted, vnp_SecureHash };

  // fake req/res
  const req = { query: fullParams };

  const res = {
    json(obj) {
      console.log('IPN handler response JSON:', obj);
      return obj;
    },
    status(code) {
      return { json: (o) => console.log('IPN handler error', code, o), send: (s) => console.log('IPN handler error', code, s) };
    }
  };

  await vnpayController.ipn(req, res);
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
