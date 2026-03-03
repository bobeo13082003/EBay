import React, { useState } from 'react';

const ShippingAddress = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, address: '123 Đường A, Quận B, TP. HCM', isDefault: true },
    { id: 2, address: '456 Đường C, Quận D, TP. HCM', isDefault: false },
  ]);

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, { id: addresses.length + 1, address: newAddress, isDefault: false }]);
  };

  return (
    <div className="shipping-address-container">
      <h1 className="text-2xl font-bold mb-4">Chọn địa chỉ giao hàng</h1>
      <ul className="address-list">
        {addresses.map(addr => (
          <li key={addr.id} className="mb-2">
            <div className="flex items-center">
              <input
                type="radio"
                name="defaultAddress"
                checked={addr.isDefault}
                onChange={() => handleSetDefault(addr.id)}
              />
              <span className="ml-2">{addr.address}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="add-address-form mt-4">
        <input
          type="text"
          placeholder="Nhập địa chỉ mới"
          className="border p-2 w-full"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              handleAddAddress(e.target.value.trim());
              e.target.value = '';
            }
          }}
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Xác nhận</button>
    </div>
  );
};

export default ShippingAddress;