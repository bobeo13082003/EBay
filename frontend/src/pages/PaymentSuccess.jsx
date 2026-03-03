import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const total = state?.total || 0;

  return (
    <div style={{ maxWidth:720, margin:'36px auto', padding:24, textAlign:'center' }}>
      <h2>Payment Successful</h2>
      <p>Your payment of <strong>US ${Number(total).toLocaleString()}</strong> was successful (simulated).</p>
      <button onClick={() => navigate('/')} style={{ marginTop:20, padding:'10px 16px' }}>Return Home</button>
    </div>
  );
};

export default PaymentSuccess;
