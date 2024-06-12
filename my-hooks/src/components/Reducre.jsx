import React, { useReducer, useState } from 'react';
import "../css/Redu.css";

const TransactionReducer = (state,action) =>{
    switch(action.type){
        case 'WITHDRAW':
            return state - action.payload;

        case 'DEPOSIT':
            return state + action.payload;

        default:
            return state
    }
}
function Reducre() {
    const withdraw = (amount)=>{
        dispatch({type:'WITHDRAW',payload:amount});
    };

    const deposit = (amount) =>{
        dispatch({type:'DEPOSIT',payload:amount});
    };

    const [state, dispatch] = useReducer(TransactionReducer,1000);
    const [inp,setInp] = useState(0);
  return (
    <>
    <div className="titls">
    <h1>Use Reducer & UseState</h1>
    <h2>Balance <span>{state}</span></h2>
    </div>

    <div className="get-inputs">
    <label htmlFor="with-depo">Enter Amount to Withdraw / Desposit </label>
    <input type="number" id="with-depo" placeholder='Amount' onChange={(e)=>setInp(e.target.value)} />
    </div>

    <div className="btns">
    <button onClick={()=>withdraw(Number(inp))}>Withdraw</button>
    <button onClick={()=>deposit(Number(inp))}>Deposit</button>
    </div>
    </>
  );
}

export default Reducre