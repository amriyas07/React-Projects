import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [Users,setUsers] = useState([]);
  const [filterUsers,setFilterUsers] = useState([]);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [newData,setNewData] = useState({name:"",age:"",city:""});
  const backendData = async () => {
    await axios.get('http://localhost:8080/users').then((res)=>{
      setUsers(res.data);
      setFilterUsers(res.data);
    });
  };
  useEffect(()=>{
    backendData();
  },[]);

  // useEffect(()=>{
  //   fetch("http://localhost:8080/users").then((res)=>res.json())
  //   .then((data)=>console.log(data));
  // },[]);

  const searchData = (e)=>{
    const searchText = e.target.value.toLowerCase();
    const filteredText = Users.filter((user)=>user.name.toLowerCase().includes(searchText) || user.city.toLowerCase().includes(searchText));
    setFilterUsers(filteredText);
  };

  const handleDelete = async (id)=>{
    const isConfirmed = window.confirm("Are you sure You want to delete this user ?");
    if(isConfirmed){
    await axios.delete(`http://localhost:8080/users/${id}`).then((res)=>{
      setUsers(res.data);
      setFilterUsers(res.data);
    });
  }
  };

  const addNewRecord = ()=>{
    setNewData({name:"",age:"",city:""});
    setIsModalOpen(true);
  };
  
  const handleClose = ()=>{
    setIsModalOpen(false);
    backendData();
  };

  const handleUserData = (e)=>{
    setNewData({...newData,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(newData.id){
      await axios.patch(`http://localhost:8080/users/${newData.id}`,newData).then((res)=>{
        console.log(res);
      });
    }else{
    await axios.post("http://localhost:8080/users",newData).then((res)=>{
      console.log(res);
    });
  }
  handleClose();
  setNewData({name:"",age:"",city:""});

  };

  const UpdateuserData = (user)=>{
    setNewData(user);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container">
        <div className="title">
          <h3>CRUD Operation</h3>
        </div>

        <div className="input-search">
          <input type="search" placeholder="Enter.." onChange={searchData}/>
          <button className='btn green' onClick={addNewRecord}>Add Record</button>
        </div>

        <div className="tableData">
          <table className='tab'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Update</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {filterUsers && filterUsers.map((user,index)=>{
                return (
                <tr key={user.id}>
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  <td><button className='btn green' onClick={()=>UpdateuserData(user)}>Edit</button></td>
                  <td><button className='btn red' onClick={()=>handleDelete(user.id)}>Delete</button></td>
                </tr>)
              })}

            </tbody>
          </table>
          {isModalOpen && (<div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleClose}>&times;</span>
              <h2>{newData.id ? "Update User":"Add User"}</h2>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" id="name" value={newData.name} onChange={handleUserData}  />
              </div>

              <div className="input-group">
                <label htmlFor="age">Age</label>
                <input type="number" name="age" id="age" value={newData.age} onChange={handleUserData}  />
              </div>

              <div className="input-group">
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" value={newData.city} onChange={handleUserData} />
              </div>

              <button className='btn green' onClick={handleSubmit}>{newData.id ? "Update User":"Add User"}</button>
            </div>
            </div>)}
        </div>
      </div>
    </>
  )
}

export default App
