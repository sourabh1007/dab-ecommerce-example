import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CART } from '../graphql/Queries';

const Cart = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_CART, { variables: { userId } });

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart!</p>;

  const cart = data.getCart;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.productId}>
            Product ID: {item.productId}, Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Price: ${cart.totalPrice}</p>
    </div>
  );
};

export default Cart;
