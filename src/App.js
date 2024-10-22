import React, { useState } from 'react';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App = () => {
  const [userId] = useState('user123'); // Hardcoded userId for simplicity

  return (
    <div>
      <h1>Simple E-Commerce</h1>
      <Catalog userId={userId} />
      <Cart userId={userId} />
      <Checkout userId={userId} />
    </div>
  );
};

export default App;
