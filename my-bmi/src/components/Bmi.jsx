import React, { useState } from 'react';
import "../components/Bm.css";
import Imag from "../assets/bmi.png";

function Bmi() {
    const [height, setHeight] = useState("");
    const [weight,setWeight] = useState("");
    const [bmi,setBmi] = useState(null);
    const [bmiStatus,setBmistatus] = useState("Over Weight");
    const [errorMess,setErrorMess] = useState("");
    const calculateBmi = ()=> {
        const isValidHeight = /^\d+$/.test(height);
        const isValidWeight = /^\d+$/.test(weight);
        if(isValidHeight && isValidWeight){
            const heightInmetres = height/100;
            const calcBmi = weight/(heightInmetres*heightInmetres);
            setBmi(calcBmi.toFixed(2));

            if(calcBmi>30){setBmistatus("Over Weight");}
            else if((calcBmi<30)&&(calcBmi>=25)){setBmistatus("Obese");}
            else if((calcBmi<25) && (calcBmi>=19)){setBmistatus("Normal");}
            else {setBmistatus("Under Weight")}
            setErrorMess("");
        }
        else{
            setBmi(null);
            setBmistatus("");
            setErrorMess("Please Enter a Valid Numberic Values");
        }
    };
    const clear = ()=>{
        setHeight("");
        setWeight("");
        setBmi(null);
        setBmistatus("");
        setErrorMess("");
        
    }

  return (
    <>
    <div className="Bmi-container">
        <div className="img-container">
            <img src={Imag} alt="image" />
        </div>
        <div className="data-container">
            <h1>BMI CALCULATOR</h1>
            <p className="error">{errorMess}</p>
            <div className="inputs-data">
                <label htmlFor="Height">Height (cm):</label>
                <input type="text" id="Height" placeholder="Enter Height" onChange={(e)=>setHeight(e.target.value)} value={height} />
            </div>
            <div className="inputs-data">
                <label htmlFor="Weight">Weight (kg):</label>
                <input type="text" id="Weight" placeholder="Enter Weight" onChange={(e)=> setWeight(e.target.value)} value={weight} />
            </div>

            <div className="inputs-btn">
            <button onClick={calculateBmi}>Calculate</button>
            <button onClick={clear}>Clear</button>
            </div>

           {bmi!==null && (<div className="result">
                <p><span>Your BMI is :</span> {bmi}</p>
                <p><span>Status :</span> {bmiStatus}</p>
            </div>)}
        </div>
    </div>
    </>
  )
}

export default Bmi