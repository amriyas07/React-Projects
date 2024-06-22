import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [uName,setUName] = useState("");
  const [eMail,setEMail] = useState("");
  const [passw,setPassword] = useState("");
  const [cpass,setCPass] = useState("");
  const Navigate = useNavigate();

  const clearData = ()=>{
    setUName("");
    setEMail("");
    setPassword("");
    setCPass("");
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(passw==cpass){
      await axios.post('http://localhost:3001/user/signup',{username:uName,email:eMail,password:passw})
      .then((res)=>console.log(res))
      .catch((err)=>console.log(err));
      clearData();
      Navigate('/login');
    } else{
      window.alert("Password Incorrect");
    }
  }
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <form className='form-control p-5' onSubmit={handleSubmit}>
        <h3 className='text-center fs-1 mb-3 p-1 fw-bold'>Sign Up</h3>

        <div className="form-group mb-3">
          <label htmlFor="name" className='mb-2 fs-10 fw-bold'>UserName</label>
          <input type="text" id="name" className='form-control' value={uName} placeholder='username' onChange={(e)=>setUName(e.target.value)} autoComplete='off' required/>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email" className='mb-2 fs-10 fw-bold'>Email</label>
          <input type="email" id="email" className='form-control' value={eMail} placeholder='Email' onChange={(e)=>setEMail(e.target.value)} autoComplete='off' required/>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="pass" className='mb-2 fs-10 fw-bold'>Password</label>
          <input type="password" id="pass" className='form-control' value={passw} placeholder='Password' onChange={(e)=>setPassword(e.target.value)} autoComplete='off' required/>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="cpass" className='mb-2 fs-10 fw-bold'>Confirm Password</label>
          <input type="password" id="cpass" className='form-control' value={cpass} placeholder='confirm Password' onChange={(e)=>setCPass(e.target.value)} autoComplete='off' required/>
        </div>

        <div className="last-group">
          <span>Already Have an Account ?</span>
          <Link to="/login">  Login</Link>
        </div>
        <button type='submit' className='btn btn-success mt-3'>Register</button>
      </form>
    </div>
  );
}
