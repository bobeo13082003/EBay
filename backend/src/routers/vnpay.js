const express = require('express');
const router = express.Router();
const vnpayController = require('../controllers/vnpay');

router.post('/create_payment', vnpayController.createPayment);
router.get('/ipn', vnpayController.ipn);
router.get('/return', vnpayController.returnUrl);

module.exports = router;
