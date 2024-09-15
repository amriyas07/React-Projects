import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table,Row,Col, Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import $ from 'jquery';

function ListUser() {
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:4000/user/list')
          .then(function (response) {
            setUsers(response.data.data);
            
            
          })
          .catch(function (error) {
            console.log(error);
          });
        
    },[users])

    const deleteUser = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: "POST",
            url: "http://localhost:4000/user/delete",
            data: { id: id },
            dataType: "json",
            success: function (response) {
              Swal.fire({
                title: "Deleted!",
                text: "The user has been deleted.",
                icon: "success"
              });
            },
            error: function (xhr, status, error) {
              Swal.fire({
                title: "Error!",
                text: "Something went wrong, please try again.",
                icon: "error"
              });
            }
          });
        }
      });
    };
    
    
    
  return (
    <div className='py-5 bg-light'>
        <div className='mx-5 px-5'>
        <Row className='w-100'>
        <Col className='d-flex flex-column align-items-end'><Link to='/adduser' className='btn btn-primary'>Add User</Link></Col>
        </Row>

        <Row>
        <Col>
        <Table responsive bordered hover className="table-striped table-custom mt-4">
            <thead>
                <tr>
                    <th>Id.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
             
                { users.map((value,index)=>(
                    <tr key={index}>
                      <td>{index+1}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.mobile}</td>
                        <td>{value.status}</td>
                        <td>
                            <Link to={`/edit/${value._id}`} className='btn btn-primary mx-1'>Edit</Link>
                            <Button onClick={()=>deleteUser(value._id)} className='btn btn-danger mx-1'>Delete</Button>
                            
                        </td>
                    </tr>
                ))
                
                }
            </tbody>
        </Table>
        </Col>
        </Row>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    </div>
  )
}

export default ListUser