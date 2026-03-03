import React from 'react';

const PaymentCOD = () => {
  const handlePayment = () => {
    alert('Giả lập thanh toán COD thành công!');
  };

  return (
    <div className="payment-cod-container">
      <h1 className="text-2xl font-bold mb-4">Thanh toán COD</h1>
      <button
        onClick={handlePayment}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Thanh toán
      </button>
    </div>
  );
};

export default PaymentCOD;