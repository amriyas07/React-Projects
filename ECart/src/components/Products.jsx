import { useContext, useState } from 'react'
import './Styles/productstyle.css';
import {cartContext} from '../App';
export default function Products({products}) {
  const {cart,setCart} = useContext(cartContext);
  const addCart=()=>{
    setCart([...cart,products]);
  }
  const removeCart=()=>{
    setCart(cart.filter((c)=>c.id!==products.id));
  }
  return (
    <div className="products-cont">
      <div className="product-img">
        <img src={products.pic} alt={products.name} />
      </div>
      <div className="product-details">
      <h3>{products.name}</h3>
        <p>Price : Rs. {products.amt}</p>
        {cart.includes(products)?(
          <button onClick={removeCart} className='btn-remove'>Remove from Cart</button>
        ):(
          <button onClick={addCart}>Add to Cart</button>
        )
          }
      </div>
    </div>
  );
}
