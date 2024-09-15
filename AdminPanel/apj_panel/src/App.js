import {BrowserRouter,Routes,Route} from "react-router-dom";
import LIndex from './auth/Login/index';
import SIndex from './auth/Signup/index';
import FIndex from './auth/Forgot/index';
import DIndex from './dashboard/index';
import LstIndex from "./user";
import './App.css';
import AddUser from "./user/AddUser";
import EditUser from "./user/EditUser";
import NavBar from "./dashboard/NavBar";

const token = localStorage.getItem('authToken');
console.log(token);
function App() {

  
  return (
    <>
    <BrowserRouter>
    {token && <NavBar/>}
    <Routes>
    {token ? 
    <> 
    <Route path='/' element={<DIndex/>} />
    <Route path='/adduser' element={<AddUser/>} />
    <Route path='/list' element={<LstIndex/>} />
    <Route path='/edit/:id' element={<EditUser/>}/>
    </> 
    : 
    <>
      <Route path="/" element={<LIndex/>}/>  
      <Route path="/signup" element={<SIndex/>}/>
      <Route path="/forgot" element={<FIndex/>}/>
    </>
      
      
      }
      
      
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
