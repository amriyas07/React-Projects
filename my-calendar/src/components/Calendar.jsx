import React, { useState } from 'react';
import "../components/cal.css";
import arrow_r from "../assets/arc.svg";
import arrow_l from "../assets/alc.svg";

const DaysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const Months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function Calendar() {
    const [selecteddate,setSelectedDate] = useState(new Date());
    const DaysInMonth = ()=>{
        const DaysArray = [];
        const FirstDay = new Date(selecteddate.getFullYear(),selecteddate.getMonth(),1);
        const LastDay = new Date(selecteddate.getFullYear(),selecteddate.getMonth()+1,0);
        
        for(let i=0; i<FirstDay.getDay();i++){
            DaysArray.push(null);
        }
        for(let i = 1; i <= LastDay.getDate(); i++) {
            DaysArray.push(new Date(selecteddate.getFullYear(), selecteddate.getMonth(), i));
        }
        
        return DaysArray;
    };
    const daysInMonthArray = DaysInMonth();
    const isSameDay = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    };
    
    const handleChangeMonth = (e)=>{
        const newMoth = parseInt(e.target.value,10);
        setSelectedDate(new Date(selecteddate.getFullYear(),newMoth,1));
    };
    const handleChangeYear = (e)=>{
        const newYear = parseInt(e.target.value,10);
        setSelectedDate(new Date(newYear,selecteddate.getMonth(),1));
        
    };
  return (
    <>
    <div className="cale-container">
        <div className="header">
            <button onClick={()=>{setSelectedDate(new Date(selecteddate.getFullYear(),selecteddate.getMonth()-1,1))}}>
                <img src={arrow_l} alt="img-icon"/>
            </button>
            <select value={selecteddate.getMonth()} onChange={handleChangeMonth}>
            {Months.map((month,index)=>(
                    <option key={index} value={index}>{month}</option>
                ))}
            </select>
            <select value={selecteddate.getFullYear()} onChange={handleChangeYear}>
                {Array.from({length:10},(_, i)=>selecteddate.getFullYear()- 5 + i).map((year)=>(
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <button onClick={()=>{setSelectedDate(new Date(selecteddate.getFullYear(),selecteddate.getMonth()+1,1))}}>
            <img src={arrow_r} alt="img-icon"/>
            </button>
        </div>

        <div className="days-of-week">
            {DaysOfWeek.map((day)=>(
                <div key={day}>{day}</div>
            ))}
        </div>

        <div className="days">
            {daysInMonthArray.map((day,index)=>(
                <div key={index} className={day ? (isSameDay(day,new Date())? "day current":"day") :"empty"}>{day ? day.getDate():""}</div>
            ))}
        </div>

    </div>
    </>
  );
}

export default Calendar