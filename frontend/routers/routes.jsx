import Cart from '../pages/Cart';
import ShippingAddress from '../pages/ShippingAddress';
import PaymentVNPay from '../pages/PaymentVNPay';
import PaymentCOD from '../pages/PaymentCOD';

const routes = [
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/shipping-address',
    element: <ShippingAddress />,
  },
  {
    path: '/payment-vnpay',
    element: <PaymentVNPay />,
  },
  {
    path: '/payment-cod',
    element: <PaymentCOD />,
  },
];

export default routes;