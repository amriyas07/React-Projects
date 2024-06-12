import { useState } from 'react'
import data from "../assets/products.json";
import Products from './Products';
import './Styles/home.css';

export default function Home() {
  const [products] = useState(data);
  return (
    <div className="products-container">
      {products.map((products)=>(
        <Products key={products.id} products={products} />
      ))}
    </div>
  );
}
