const http = require('http');
const crypto = require('crypto');
const qs = require('qs');

// Configuration (override via env)
const target = process.env.IPN_TARGET || 'http://localhost:9999/api/vnpay/ipn';
const vnp_TmnCode = process.env.VNPAY_TMN_CODE || 'R8KNSKEL';
const vnp_HashSecret = process.env.VNPAY_HASH_SECRET || '4I3E5OMTVBLRAAY2TK3QK5AU44AZJVYA';

function formatDate(date) {
  return date.toISOString().replace(/[-:]/g, '').slice(0, 14);
}

async function sendIpn() {
  const params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode,
    vnp_TxnRef: 'TEST_' + Date.now(),
    vnp_OrderInfo: 'Test IPN',
    vnp_Amount: String(10000 * 100),
    vnp_ResponseCode: '00',
    vnp_CreateDate: formatDate(new Date()),
  };

  const sorted = {};
  Object.keys(params).sort().forEach(k => (sorted[k] = params[k]));
  const signData = qs.stringify(sorted, { encode: false });
  const hmac = crypto.createHmac('sha512', vnp_HashSecret);
  const vnp_SecureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  const fullParams = { ...sorted, vnp_SecureHash };
  const query = qs.stringify(fullParams, { encode: true });

  const url = new URL(target + '?' + query);

  const options = {
    hostname: url.hostname,
    port: url.port || 80,
    path: url.pathname + url.search,
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      console.log('Response:', data);
    });
  });

  req.on('error', (e) => console.error('Request error', e));
  req.end();
}

sendIpn().catch(console.error);
