import React from 'react';
import { useMutation } from '@apollo/client';
import { CHECKOUT_CART, PROCESS_PAYMENT } from '../graphql/Mutations';

const Checkout = ({ userId }) => {
  const [checkoutCart] = useMutation(CHECKOUT_CART);
  const [processPayment] = useMutation(PROCESS_PAYMENT);

  const handleCheckout = async () => {
    const { data } = await checkoutCart({ variables: { userId } });
    const orderId = data.checkoutCart.orderId;
    await processPayment({ variables: { orderId, paymentMethod: 'credit_card', amount: data.checkoutCart.totalPrice } });
    alert('Payment successful!');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Complete Payment</button>
    </div>
  );
};

export default Checkout;
