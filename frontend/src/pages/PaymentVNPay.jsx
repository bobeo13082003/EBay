import React, { useState } from 'react';
import './PaymentVNPay.css';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentVNPay = () => {
  const { state } = useLocation();
  const { items = [], subtotal = 0, shipping = 0, total = 0, cardInfo = {} } = state || {};
  const sub = Number(subtotal) || 0;
  const ship = Number(shipping) || 0;
  const tot = Number(total) || 0;

  const [form, setForm] = useState({
    email: '',
    country: 'vietnam',
    firstName: '',
    lastName: '',
    streetAddress: '',
    streetAddress2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const handleChange = e => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const navigate = useNavigate();

  const handleConfirm = async e => {
    e.preventDefault();
    try {
      // call backend to create VNPay payment URL
      const resp = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:9999'}/api/vnpay/create_payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: tot, // amount expected in main currency units (controller multiplies by 100)
          orderId: `ORDER_${Date.now()}`,
          orderInfo: `Payment for ${items.length} items`,
          ipAddr: '',
        }),
      });
      const data = await resp.json();
      if (data.paymentUrl) {
        // redirect browser to VNPay
        window.location.href = data.paymentUrl;
      } else {
        alert('Failed to create VNPay payment');
      }
    } catch (err) {
      console.error('Create VNPay payment error', err);
      alert('Create VNPay payment failed');
    }
  };

  return (
    <div className="payment-container">
      <div className="review-order">
        <h2>Review Order</h2>
        {items.length === 0 ? (
          <p>No items passed from cart.</p>
        ) : (
          items.map(it => (
            <div className="order-item" key={it.id}>
              <img src={it.img} alt={it.title} />
              <div className="item-details">
                <h4>{it.title}</h4>
                <p>{it.desc}</p>
                <p>Price (each): <span>US ${it.price.toLocaleString()}</span></p>
                <p>Quantity: {it.qty}</p>
                <p>Line total: <strong>US ${(it.price * it.qty).toLocaleString()}</strong></p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="shipping-details">
        <h2>Ship to</h2>
        <form onSubmit={handleConfirm}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" value={form.email} onChange={handleChange} type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country/Region</label>
            <select id="country" value={form.country} onChange={handleChange}>
              <option value="vietnam">Vietnam</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="First Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Last Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress">Street Address</label>
            <input id="streetAddress" value={form.streetAddress} onChange={handleChange} type="text" placeholder="Street Address" required />
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress2">Street Address 2 (Optional)</label>
            <input id="streetAddress2" value={form.streetAddress2} onChange={handleChange} type="text" placeholder="Street Address 2" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input id="city" value={form.city} onChange={handleChange} type="text" placeholder="City" required />
          </div>
          <div className="form-group">
            <label htmlFor="state">State/Province</label>
            <input id="state" value={form.state} onChange={handleChange} type="text" placeholder="State/Province" required />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input id="zipCode" value={form.zipCode} onChange={handleChange} type="text" placeholder="Zip Code" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Phone Number" required />
          </div>
          <button type="submit" className="save-button">Done</button>
        </form>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <p>Items: <span>US ${sub.toLocaleString()}</span></p>
        <p>Shipping: <span>US ${ship.toLocaleString()}</span></p>
        <p>Order Total: <span>US ${tot.toLocaleString()}</span></p>
        <button className="confirm-button" onClick={handleConfirm}>Confirm and pay</button>
        <p className="money-back">Purchase protected by eBay Money Back Guarantee</p>
      </div>
    </div>
  );
};

export default PaymentVNPay;