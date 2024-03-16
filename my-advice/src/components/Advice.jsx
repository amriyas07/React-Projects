import React,{useEffect, useState} from 'react'

function Advice() {
    const [advice,setAdvice]=useState("Click the Button to Get Free Advice");
    const [count,setCount]=useState(0);
    async function getAdvice(){
        const res =await fetch("https://api.adviceslip.com/advice");
        const convData =await res.json();
        setAdvice(convData.slip.advice);
        setCount((count)=>count+1);
    }
    useEffect(function (){
        getAdvice();
    },[]);
  return (
    <div className="adv">
        <h2>{advice}</h2>
        <button onClick={getAdvice}>Get Advice</button>
        <Counter count={count}/>
    </div>
  );
}
function Counter(props){
    return(
        <p>You've got <strong>{props.count}</strong> Advice</p>
    );
}
export default Advice