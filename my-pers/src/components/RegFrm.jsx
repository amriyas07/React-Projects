import {useState} from 'react'

function RegFrm() {
    const [users,setUsers] = useState({names:"RIYAS",AGE:20,Gender:"MALE",isMarried:false,Country:"INDIA",Bio:"Tell Me About Yourself"});
    function changeHandlers(e){
        const name=e.target.name;
        const value=e.target.type==="checkbox"?e.target.checked:e.target.value;
        setUsers({...users,[name]:value});
    }
  return (
    <>
    <div className="dynamic-cont">
        <h1>Dynamic React Form</h1>
    <table className='tab-bg'>
        <thead>
            <tr>
                <td>Names</td>
                <td>Age</td>
                <td>Gender</td>
                <td>Marital Status</td>
                <td>Country</td>
                <td>Bio</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{users.names}</td>
                <td>{users.AGE}</td>
                <td>{users.Gender}</td>
                <td>{users.isMarried ? "MARRIED":"SINGLE"}</td>
                <td>{users.Country}</td>
                <td>{users.Bio}</td>
            </tr>
        </tbody>
    </table>
    <form className="dynamic">
        <input type="text" placeholder="Enter Your Name" name="names" value={users.names} onChange={changeHandlers}/>
        <input type="number" placeholder="Enter Your Age" name="AGE" value={users.AGE} onChange={changeHandlers}/>
        <div className="gender">
            <label htmlFor="male">
                <input type="radio" name="Gender" id="male" checked={users.Gender=="MALE"} value="MALE" onChange={changeHandlers} />
                Male
            </label>
            <label htmlFor="female">
                <input type="radio" name="Gender" id="female" checked={users.Gender=="FEMALE"} value="FEMALE" onChange={changeHandlers}/>
                Female
            </label>
        </div>
        <label htmlFor="isMarried">
            <input type="checkbox" name="isMarried" id="isMarried" checked={users.isMarried}  onChange={changeHandlers} />
            isMarried
        </label>
        <div className="select-div">
            <label htmlFor="country">Select Country: </label>
            <select name="Country" id="country" value={users.Country} onChange={changeHandlers}>
            <option value="USA">USA</option>
            <option value="INDIA">INDIA</option>
            <option value="UK">UK</option>
            </select>
        </div>
        <textarea className='bio' name="Bio" id="BIO" cols="30" rows="5" value={users.Bio} onChange={changeHandlers}/>
    </form>
    </div>
    </>
  );
}

export default RegFrm