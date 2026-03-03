import React, { useMemo, useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const initialItems = [
  {
    id: 1,
    title: 'OnePlus 7T Pro',
    desc: '256 GB, Nebula Blue',
    price: 800,
    qty: 1,
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=0b1b2e9f9f8e2e8b',
  },
  {
    id: 2,
    title: 'Google Pixel 4 XL',
    desc: '64 GB, Just Black',
    price: 900,
    qty: 1,
    img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=3e5f4a8f9a6b0f1d',
  },
  {
    id: 3,
    title: 'Samsung Galaxy Note 10',
    desc: '256 GB, Aura Glow',
    price: 1000,
    qty: 1,
    img: 'https://images.unsplash.com/photo-1510557880182-3f8d34aabf72?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=7b6d2a6d4f9e5c2a',
  },
  {
    id: 4,
    title: 'iPhone 11 Pro',
    desc: '256 GB, Space Gray',
    price: 1100,
    qty: 1,
    img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=3e5f4a8f9a6b0f1d',
  },
];

const Cart = () => {
  const [items, setItems] = useState(initialItems);
  const [cardInfo, setCardInfo] = useState({
    cardType: 'visa',
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const navigate = useNavigate();

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;

  const changeQty = (id, delta) => {
    setItems(prev =>
      prev
        .map(it => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
        .filter(Boolean)
    );
  };

  const removeItem = id => setItems(prev => prev.filter(it => it.id !== id));

  const handleCardChange = e => {
    const { id, value } = e.target;
    setCardInfo(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckout = e => {
    e.preventDefault();
    // pass cart + payment info to payment page via navigation state
    navigate('/payment-vnpay', { state: { items, subtotal, shipping, total, cardInfo } });
  };

  return (
    <div className="cart-container">
      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        <p>You have {items.length} items in your cart</p>
        <div className="cart-items">
          {items.map(it => (
            <div className="cart-item" key={it.id}>
              <img src={it.img} alt={it.title} />
              <div className="item-details">
                <h4>{it.title}</h4>
                <p>{it.desc}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => changeQty(it.id, -1)}>-</button>
                <span>{it.qty}</span>
                <button onClick={() => changeQty(it.id, +1)}>+</button>
              </div>
              <p className="item-price">${(it.price * it.qty).toLocaleString()}</p>
              <button style={{ marginLeft: 12 }} onClick={() => removeItem(it.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <div className="card-details">
        <h2>Card Details</h2>
        <form onSubmit={handleCheckout}>
          <div className="form-group">
            <label htmlFor="cardType">Card Type</label>
            <select id="cardType" value={cardInfo.cardType} onChange={handleCardChange}>
              <option value="mastercard">MasterCard</option>
              <option value="visa">Visa</option>
              <option value="amex">American Express</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="nameOnCard">Name on Card</label>
            <input id="nameOnCard" value={cardInfo.nameOnCard} onChange={handleCardChange} type="text" placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input id="cardNumber" value={cardInfo.cardNumber} onChange={handleCardChange} type="text" placeholder="1111 2222 3333 4444" />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="expiryDate">Expiration Date</label>
              <input id="expiryDate" value={cardInfo.expiryDate} onChange={handleCardChange} type="text" placeholder="MM/YY" />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="cvv">CVV</label>
              <input id="cvv" value={cardInfo.cvv} onChange={handleCardChange} type="text" placeholder="123" />
            </div>
          </div>
          <div className="summary">
            <p>Subtotal: <span>${subtotal.toLocaleString()}</span></p>
            <p>Shipping: <span>${shipping.toLocaleString()}</span></p>
            <p>Total (tax incl.): <span>${total.toLocaleString()}</span></p>
          </div>
          <button type="submit" className="checkout-button">Checkout</button>
        </form>
      </div>
    </div>
  );
};

export default Cart;