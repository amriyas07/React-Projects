import React, { useEffect, useState } from 'react'
import "./Dc.css"
function DigitalClock() {
    const [currentTime,setCurrentTime] = useState(new Date());
    const Day = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrentTime(new Date());
        },1000);
        return () => clearInterval(timer);
    },[]);
    const Hrs = currentTime.getHours();
  return (
    <>
    <div className="digiClock">
        <h1>Digital Clock</h1>
        <h2>{Hrs>12 ? Hrs-12 : Hrs}<span>:</span>{currentTime.getMinutes()}<span>:</span><b className='b'>{currentTime.getSeconds()}</b></h2>
        <h3>{currentTime.getDate()}<span>:</span>{currentTime.getMonth()+1}<span>:</span>{currentTime.getFullYear()}</h3>
        <h4><b>{Months[currentTime.getMonth()]}</b>  {Day[currentTime.getDay()-1]}</h4>
    </div>
    </>
  );
}

export default DigitalClock