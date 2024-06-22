import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
export default function Login() {
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const Navigate = useNavigate();

  const clearData = ()=>{
    setUserName("");
    setPassword("");
  };
  const handleSubmit =  (e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/user/login",{email:userName,password:password})
    .then((res)=>{
      if(res.data=="Success"){
        clearData();
        Navigate('/home');
      } else{
        clearData();
        window.alert(res.data);
      }
    })
    .catch((err)=>console.log(err));
    };
    
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <form className='form-control p-5 forms' onSubmit={handleSubmit}>
        <h3 className='text-center fs-1 mb-3 p-1 fw-bold'>Login</h3>
        <div className="form-group mb-3">
          <label htmlFor="name" className='mb-2 fs-10 fw-bold'>UserName</label>
          <input type="text" id="name" className='form-control' value={userName} placeholder='username or email' onChange={(e)=>setUserName(e.target.value)} autoComplete='off' required/>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="pass" className='mb-2 fs-10 fw-bold'>Password</label>
          <input type="password" id="pass" className='form-control' value={password} placeholder='Password' onChange={(e)=>setPassword(e.target.value)} autoComplete='off' required/>
        </div>
        <div className="last-group">
          <span>Register New ?</span>
        <Link to='/signup'>  Sign Up</Link>
        </div>
        <button type='submit' className='btn btn-success mt-3'>Login</button>
      </form>
    </div>
  );
}
