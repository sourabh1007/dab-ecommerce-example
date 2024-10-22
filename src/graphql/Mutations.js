import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation AddToCart($userId: String!, $productId: String!, $quantity: Int!) {
    addToCart(userId: $userId, productId: $productId, quantity: $quantity) {
      id
      items {
        productId
        quantity
      }
      totalPrice
    }
  }
`;

export const CHECKOUT_CART = gql`
  mutation CheckoutCart($userId: String!) {
    checkoutCart(userId: $userId) {
      orderId
      status
      totalPrice
    }
  }
`;

export const PROCESS_PAYMENT = gql`
  mutation ProcessPayment($orderId: String!, $paymentMethod: String!, $amount: Float!) {
    processPayment(orderId: $orderId, paymentMethod: $paymentMethod, amount: $amount) {
      paymentId
      status
    }
  }
`;
