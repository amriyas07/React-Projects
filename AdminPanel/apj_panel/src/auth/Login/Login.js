import axios from 'axios';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import { Form, Button,  Row, Col } from 'react-bootstrap';
import { useState } from "react";
import {validateEmail} from '../Helper';

function Login() {
    const [userName,setUserName] = useState('');
    const [nameError,setNameError] = useState(false);
    const [nameFormatError,setNameFormatError] = useState(false);
    const [password,setPassword] = useState('');
    const [passError,setPassError] = useState(false);
    const handleSubmit=()=>{
        // console.log(userName,password);
        if(userName.trim()){
            setNameError(false);
            if(validateEmail(userName)){
                setNameFormatError(false);
            } else{
                setNameFormatError(true);
            }
        } else{
            setNameError(true);
        }

        if(password.trim()){
            setPassError(false);
        } else{
            setPassError(true);
        }

        if(userName.trim() && password.trim()){
        axios.post('http://localhost:4000/user/login', {
          email:userName,password:password
        })
        .then(function (response) {
          // localStorage.setItem('authToken',response.data.token);
          // console.log('Login',response);
          // window.location="/";
          if(response.data.status==1){
            localStorage.setItem('authToken',response.data.token);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login Success",
              showConfirmButton: false,
              timer: 1500
            }).then(()=>{
              window.location = '/';
            });

          } else{
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${response.data.message}`,
              showConfirmButton: false,
              timer: 1500
            });
          }
          
          
        })
        .catch(function (error) {
          console.log(error);
        });
        }
        
    }
  return (
    <div className='container mt-5'>
    <Row className="justify-content-center">
        <Col md={6}>
          <Form className="p-4 shadow-lg rounded-3 bg-white">
            <h2 className="text-center mb-4 text-primary">Login</h2>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label className="fw-bold text-primary">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="border-primary bg-light" value={userName} onChange={(e)=>setUserName(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <br/>
              {nameError ? <span style={{color:'red'}}>Required</span> : ""}
              {nameFormatError ? <span style={{color:'red'}}>Invalid Email</span> : ""}
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label className="fw-bold text-primary">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="border-primary bg-light" value={password} onChange={(e)=>setPassword(e.target.value)}
              />
              <br/>
              {passError ? <span style={{color:'red'}}>Required</span> : ""}
            </Form.Group>

            <div className="d-flex justify-content-between mb-3">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  className="text-primary"
                />
              </Form.Group>

              <Link to="/forgot" className="text-primary">
                Forgot Password?
              </Link>
            </div>

            <Button variant="primary" onClick={handleSubmit} className="w-100 fw-bold mt-4">
              Submit
            </Button>

            <div className="text-center mt-3">
              <Link to="/signup" className="text-primary">
                Don't have an account? Create Account
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
</div>
  )
}

export default Login