import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/Queries';
import { ADD_TO_CART } from '../graphql/Mutations';

const Catalog = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, { variables: { category: "all", limit: 10, offset: 0 } });
  const [addToCart] = useMutation(ADD_TO_CART);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products!</p>;

  const handleAddToCart = (productId) => {
    addToCart({ variables: { userId, productId, quantity: 1 } });
  };

  return (
    <div>
      <h2>Product Catalog</h2>
      <ul>
        {data.listProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;
