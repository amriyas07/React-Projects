import {useState} from 'react'

function States() {
    const [user,setUser] = useState({myname:"RIYAS",Age:20});
    function changeHandler(e){
      // Method 1
      // const temp = {...user};
      // temp.myname = e.target.value;
      // setUser(temp);
  
      // Method 2
      // setUser((oldState)=>{
      //   return {...oldState,myname:e.target.value};
      // });
  
      // Method 3
      setUser({...user,[e.target.name]:e.target.value});
    }
  return (
    <>
      <div className="container">
        <input type='text' name="myname" onChange={changeHandler}/><input type='text' name='Age' onChange={changeHandler}/>
        <h1>{user.myname}{user.Age}</h1>
      </div>
    </>
  );
}

export default States