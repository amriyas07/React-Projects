import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import "./Styles/Navb.css";
import {cartContext} from '../App';
export default function NavBar() {
  const {cart} = useContext(cartContext);
  return (
    <div className="navi">
        <div className="logo"><Link to={"/"}>E Cart</Link></div>
    <ul><li><Link to={"/"}>Home</Link></li>
    <li>{cart.length>0 ? (<span className='add-len'>{cart.length}</span>):(<span></span>)}<Link to={"/Cart"}>View Cart</Link></li></ul>
    </div>
  );
}
