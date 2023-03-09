import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  
  interface Product {
    id: number;
    title: string;
    price: number;
  }

  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProductList = () => {
    fetch('/products')
      .then(response => response.json())
      .then(products => setProductList(products))
  }

  useEffect(() => {
    fetchProductList();
  }, [])


  return (
    <div className="App">
      {productList && productList.map(product => (
        <div key={product.id}>
          <span>{product.title} - {product.price}$</span>
        </div>
      ))}
    </div>
  );
}

export default App;
