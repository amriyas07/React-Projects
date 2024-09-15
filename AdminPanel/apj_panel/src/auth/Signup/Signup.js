import axios from 'axios';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import { Form, Button,  Row, Col } from 'react-bootstrap';
import { useState } from "react";
import {validateEmail,validatePassword} from '../Helper';

function Signup() {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [mobile,setMobile] = useState('');
  const [mobileError,setMobileError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [validEmailError, setValidEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [cpass, setCPass] = useState('');
  const [cpassError, setCPassError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [strongPassError, setStrongPassError] = useState(false);

    const handleSubmit=()=>{
      let valid = true;

      // Name validation
      if (name.trim()) {
        setNameError(false);
      } else {
        setNameError(true);
        valid = false;
      }

      // Mobile validation
      if (mobile.trim()) {
        setMobileError(false);
      } else {
        setMobileError(true);
        valid = false;
      }
  
      // Email validation
      if (email.trim()) {
        setEmailError(false);
        if (validateEmail(email)) {
          setValidEmailError(false);
        } else {
          setValidEmailError(true);
          valid = false;
        }
      } else {
        setEmailError(true);
        setValidEmailError(false);
        valid = false;
      }
  
      // Password validation
      if (password.trim()) {
        setPassError(false);
        if (validatePassword(password)) {
          setStrongPassError(false);
          if (password === cpass) {
            setCPassError(false);
          } else {
            setCPassError(true);
            valid = false;
          }
        } else {
          setStrongPassError(true);
          setCPassError(false);
          valid = false;
        }
      } else {
        setPassError(true);
        setStrongPassError(false);
        setCPassError(false);
        valid = false;
      }
  
      if (valid) {
        // Form submission logic here
        axios.post('http://localhost:4000/user/signup', {
          name:name,mobile:mobile,email:email,password:password
        })
        .then(function (response) {
          if(response.data.status==1){
            localStorage.setItem('authToken',response.data.token);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Registration Success",
              showConfirmButton: false,
              timer: 1500
            }).then(()=>{
              window.location = '/'
            })
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
            <h2 className="text-center mb-4 text-primary">Register</h2>

            <Form.Group controlId="formBasicFname">
              <Form.Label className="fw-bold text-primary">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                className={`border-primary bg-light ${nameError ? 'is-invalid' : ''}`}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <div className="invalid-feedback">Name is required</div>}
            </Form.Group>

            <Form.Group controlId="formBasicMobile">
            <Form.Label className="fw-bold text-primary">Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              className={`border-primary bg-light ${mobileError ? 'is-invalid' : ''}`}
              onChange={(e) => setMobile(e.target.value)}
            />
            {mobileError && <div className="invalid-feedback">Mobile number is required</div>}
          </Form.Group>


            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label className="fw-bold text-primary">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className={`border-primary bg-light ${emailError || validEmailError ? 'is-invalid' : ''}`}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="invalid-feedback">Email is required</div>}
              {validEmailError && <div className="invalid-feedback">Invalid email address</div>}
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label className="fw-bold text-primary">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className={`border-primary bg-light ${passError || strongPassError ? 'is-invalid' : ''}`}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passError && <div className="invalid-feedback">Password is required</div>}
              {strongPassError && <div className="invalid-feedback">Strong password required</div>}
            </Form.Group>

            <Form.Group controlId="formBasicCPassword" className="mt-3">
              <Form.Label className="fw-bold text-primary">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                className={`border-primary bg-light ${cpassError ? 'is-invalid' : ''}`}
                onChange={(e) => setCPass(e.target.value)}
              />
              {cpassError && <div className="invalid-feedback">Passwords do not match</div>}
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit} className="w-100 mt-4 fw-bold">
              Register
            </Button>

            <div className="text-center mt-3">
              <Link to="/" className="text-primary">
                Already have an account? Back to login
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Signup