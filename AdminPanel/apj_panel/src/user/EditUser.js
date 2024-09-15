import Swal from 'sweetalert2'
import {Link, useParams} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EditUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    const {id} = useParams('id');
    useEffect(()=>{
        axios.put('http://localhost:4000/user/edituser',{id:id})
          .then(function (response) {
            setName(response.data.data.name);
            setEmail(response.data.data.email);           
          })
          .catch(function (error) {
            console.log(error);
          });
        
    },[])

    const handleUpdate=()=>{
        if(name.trim()!="" || email.trim()!=""){
            axios.post('http://localhost:4000/user/update',{id:id,name:name,email:email})
            .then(function (response) {
            //   setUsers(response.data.data);  
            if(response.data.status==1){
                Swal.fire({
                    title: 'Data Updated',
                    text: 'Successfully',
                    icon: 'success',
                }).then(()=>{
                    window.location = '/list';
                });

            } else{
                Swal.fire({
                    title: `${response.data.message}`,
                    text: 'Failed',
                    icon: 'error',
                });
            }

            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }

  return (
    <div className="container-fluid">
    <div className="container d-flex flex-column">
    <h1 className='text-center mt-5 text-primary'>Edit User</h1>
    <Form>
    <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </Form.Group>

    {/* <Form.Group className="mb-3" controlId="formStatus">
        <Form.Label>Status</Form.Label>
        <Form.Select onChange={(e) => setStatus(e.target.value)}>
        <option>Active</option>
        <option>Inactive</option>
        </Form.Select>
    </Form.Group> */}

    <div className='d-flex mt-5'>
    <Button variant="primary" onClick={handleUpdate}>
        Update
    </Button>

    <Link className='btn btn-danger mx-3' to="/list">
        Cancel
    </Link>
    </div>
  </Form>
    </div>
</div>
  )
}

export default EditUser