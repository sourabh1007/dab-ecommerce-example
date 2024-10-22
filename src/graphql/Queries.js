import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($category: String, $limit: Int, $offset: Int) {
    listProducts(category: $category, limit: $limit, offset: $offset) {
      id
      name
      price
      stock
    }
  }
`;

export const GET_CART = gql`
  query GetCart($userId: String!) {
    getCart(userId: $userId) {
      id
      items {
        productId
        quantity
      }
      totalPrice
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders($userId: String!) {
    getOrders(userId: $userId) {
      id
      items {
        productId
        quantity
      }
      totalPrice
      status
    }
  }
`;
