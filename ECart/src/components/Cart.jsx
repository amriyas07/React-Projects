import React, { useContext, useEffect, useState } from 'react'
import './Styles/crt.css';
import {cartContext} from '../App';
export default function Cart() {
  const {cart} = useContext(cartContext);
  const [total,setTotal] = useState(0);
  useEffect(()=>{
      setTotal(cart.reduce((acc,curr)=> acc + Number(curr.amt),0));
    }
    ,[cart]);
  return (
    <>
    <div className="cart-container">
      {cart.map((product)=>(
              <div className="cart-products" key={product.id}>
              <div className="img-container">
                <img src={product.pic} alt="image" />
              </div>
              <div className="cart-product-details">
                <h2>{product.name}</h2>
                <p>Price : Rs.{product.amt}</p>
              </div>
              </div>
              
      ))}
      {cart.length>0 ?(<div><h2>Total Amount Rs: {total}</h2></div>):(<div><h2>Your Cart is Empty!</h2></div>)}
    </div>
    </>
  );
}
