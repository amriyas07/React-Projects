import React, { useState } from 'react';
import "../components/PassStyle.css";

function PasswordGenerator() {
    const [length,setLength] = useState(8);
    const [inclUpper,setInclUpper] = useState(true);
    const [inclLower,setInclLower] = useState(true);
    const [inclNumber,setInclNumber] = useState(true);
    const [inclSymbol,setInclSymbol] = useState(true);
    const [password,setPassword] = useState("");
    const changeHandler= (e)=>{
        setLength(parseInt(e.target.value));
    };
    const generatePassword = ()=>{
        let charset = "";
        if(inclUpper) charset+= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if(inclLower) charset+= "abcdefghijklmnopqrstuvwxyz";
        if(inclNumber) charset+= "0123456789";
        if(inclSymbol) charset+= "!@#$%^&*()_-+=";
        let genPass = "";
        for(let i=0;i<length;i++){
            const randIndex = Math.floor(Math.random()*charset.length);
            genPass += charset[randIndex];
        }
        setPassword(genPass);
    };
    const copyToClipboard = ()=>{
        navigator.clipboard.writeText(password);
        alert("copied successfully!");
    };
  return (
    <>
    <div className="container">
        <h1>Password Generator</h1>
        <div className="inputs">
            <label htmlFor="pLen">Password Length: </label>
            <input type="number" id="pLen" onChange={changeHandler} value={length} />
        </div>

        <div className="checks-input">
           <input type="checkbox" id="Upper" checked={inclUpper} onChange={(e)=>setInclUpper(e.target.checked)}/>
           <label htmlFor="Upper"> Include UpperCase</label>
        </div>

        <div className="checks-input">
           <input type="checkbox" id="Lower" checked={inclLower} onChange={(e)=>setInclLower(e.target.checked)} />
           <label htmlFor="Lower"> Include LowerCase</label>
        </div>

        <div className="checks-input">
           <input type="checkbox" id="Num" checked={inclNumber} onChange={(e)=>setInclNumber(e.target.checked)} />
           <label htmlFor="Num"> Include Number</label>
        </div>

        <div className="checks-input">
           <input type="checkbox" id="Symbols" checked={inclSymbol} onChange={(e)=>setInclSymbol(e.target.checked)} />
           <label htmlFor="Symbols"> Include Symbols</label>
        </div>

        <button className="gen-btn" onClick={generatePassword}>Generate Password</button>

        <div className="generatedPass">
            <input type="text" value={password} readOnly/>
            <button className="cpy-btn" onClick={copyToClipboard}>Copy</button>
        </div>

    </div>
    </>
  );
}

export default PasswordGenerator