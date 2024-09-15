import axios from 'axios';
import Swal from 'sweetalert2'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [mobile,setMobile] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const [mobileError,setMobileError] = useState(false);

    const handleSubmit=()=>{
        if(name.trim()){
            setNameError(false);
        } else{
            setNameError(true);
        }

        if(email.trim()){
            setEmailError(false);
        } else{
            setEmailError(true);
        }

        if(mobile.trim()){
            setMobileError(false);
        } else{
            setMobileError(true);
        }

        if(status!==""){
            setStatusError(false);
        } else{
            setStatusError(true);
        }

        if(name.trim() && email.trim() && mobile.trim() && status!==""){
                    // Form submission logic here
        axios.post('http://localhost:4000/user/adduser', {
            name:name,mobile:mobile,email:email,status:status
          })
          .then(function (response) {
            // console.log(response);
            // localStorage.setItem('authToken',response.data.token);
            if(response.data.status==1){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Data Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });

                setName('');
                setEmail('');
                setMobile('');
                setStatus('');
                
            }
            
            
            
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire({
                title: 'Failed',
                text: `${error}`,
                icon: 'error',
            });
          });
        }


    }

  return (
    <div className="container-fluid">
        <div className="container d-flex flex-column">
        <h1 className='text-center mt-5 text-primary'>Add User</h1>
        <Form>
        <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}/>
            {nameError ? <span style={{color:'red'}}>Required</span> : ""}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={email} placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)}/>
            {emailError ? <span style={{color:'red'}}>Required</span> : ""}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMobile">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control type="text" value={mobile} placeholder="Enter your mobile number" onChange={(e) => setMobile(e.target.value)}/>
        {mobileError ? <span style={{color: 'red'}}>Required</span> : ""}
        </Form.Group>


        <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="InActive">Inactive</option>
            </Form.Select>
            {statusError ? <span style={{color:'red'}}>Required</span> : ""}
        </Form.Group>

        <Button variant="primary" className='mt-3' onClick={handleSubmit}>
            Add
        </Button>
      </Form>
        </div>
    </div>
  )
}

export default AddUser