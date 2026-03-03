import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentVNPay.css';

const VNPayCheckout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { items = [], subtotal = 0, shipping = 0, total = 0, shippingInfo = {} } = state || {};

  const handlePay = () => {
    // simulate redirect to VNPay and back with success
    setTimeout(() => {
      navigate('/payment-success', { state: { success: true, total } });
    }, 800);
  };

  return (
    <div style={{ maxWidth: 720, margin: '24px auto', padding: 20 }}>
      <h2 style={{ marginBottom: 8 }}>VNPay - Simulated Checkout</h2>
      <p>Amount to pay: <strong>US ${Number(total).toLocaleString()}</strong></p>
      <div style={{ marginTop: 16 }}>
        <button onClick={handlePay} style={{ padding: '12px 18px', background:'#0ea5a2', color:'#fff', border:'none', borderRadius:8 }}>Pay with VNPay</button>
      </div>
      <div style={{ marginTop: 18 }}>
        <small>Shipping to: {shippingInfo.firstName} {shippingInfo.lastName} — {shippingInfo.streetAddress}</small>
      </div>
    </div>
  );
};

export default VNPayCheckout;
