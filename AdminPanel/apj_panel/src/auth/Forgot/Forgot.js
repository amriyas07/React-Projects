import {Link} from "react-router-dom";
import { useState } from 'react';
import { Form, Button,  Row, Col } from 'react-bootstrap';
import {validateEmail} from '../Helper';
function Forgot() {
    const [email,setEmail] = useState('');
    const [emailError,setEmailError] = useState(false);
    const [emailFormatError,setEmailFormatError] = useState(false);
    const handleSubmit=()=>{
        if(email.trim()){
            setEmailError(false);
            if(validateEmail(email)){
                setEmailFormatError(false);
            } else{
                setEmailFormatError(true);
            }
        } else{
            setEmailError(true);
            setEmailFormatError(false);
        }
    }
  return (
    <div className='container mt-5'>
        <Row className="justify-content-center">
        <Col md={6}>
          <Form className="p-4 shadow-lg rounded-3 bg-white">
            <h2 className="text-center mb-4 text-primary">Forgot Password</h2>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label className="fw-bold text-primary">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email" value={email}
                className="border-primary bg-light" onChange={(e)=>setEmail(e.target.value)}
              />
              {emailError? <span style={{color:'red'}}>Required</span> : ""}
              {emailFormatError ? <span style={{color:'red'}}>Invalid Email</span> : ""}
              <br/>
              <Form.Text className="text-muted">
                Enter the email associated with your account.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit} className="w-100 fw-bold mt-4">
              Reset Password
            </Button>

            <div className="text-center mt-3">
              <Link to="/" className="text-primary">
                Back to Login
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Forgot