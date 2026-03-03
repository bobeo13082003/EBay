VNPAY Sandbox integration (local helpers)

Configuration (sandbox credentials):

- Terminal ID / Mã Website (vnp_TmnCode): R8KNSKEL
- Secret Key / vnp_HashSecret: 4I3E5OMTVBLRAAY2TK3QK5AU44AZJVYA
- Test payment URL: https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
- Merchant admin: https://sandbox.vnpayment.vn/merchantv2/

Environment variables (example .env):

VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNPAY_TMN_CODE=R8KNSKEL
VNPAY_HASH_SECRET=4I3E5OMTVBLRAAY2TK3QK5AU44AZJVYA
VNPAY_RETURN_URL=https://your-server.com/api/vnpay/return
VNPAY_RETURN_FRONTEND=https://your-frontend.com/payment-result
MONGO_URI=mongodb://localhost:27017/yourdb

IPN endpoint to register in VNPay sandbox:
https://<your-domain>/api/vnpay/ipn

Testing locally (simulate IPN):

1. Start backend server (ensure `MONGO_URI` is set):

```bash
cd backend
npm install
npm run start
```

2. In a separate shell, run the test script to send a signed IPN to your local server:

```bash
# optional env overrides
IPN_TARGET=http://localhost:9999/api/vnpay/ipn VNPAY_TMN_CODE=R8KNSKEL VNPAY_HASH_SECRET=4I3E5OMTVBLRAAY2TK3QK5AU44AZJVYA node ./scripts/send_ipn_test.js
```

3. Check server logs and MongoDB `orders` collection to see the created/updated order.

Notes:
- The `ipn` handler verifies HMAC SHA512 using `VNPAY_HASH_SECRET` before updating the DB.
- Implement any additional business checks (amount matching, order existence) as needed.
