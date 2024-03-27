import React, { useEffect, useState } from 'react';
import "../components/Curr.css";
import Money from "../assets/curr.png";
import axios from "axios";

function Currency() {
    const [amount,setAmount]=useState(1);
    const [from,setFrom]=useState("INR");
    const [to,setTo]=useState("USD");
    const [converted,setConverted]=useState(null);
    const [exRate,setExRate] = useState(null);

    useEffect(()=>{
        const getExchangeRate = async ()=>{
            try{
                let url = `https://v6.exchangerate-api.com/v6/8fd84da36256f73d19042465/latest/${from}`;
                const res = await axios.get(url);
                // console.log(res);
                setExRate(res.data.conversion_rates[to]);
            }
            catch(error){
                console.log("Error To fetch data",error);
            }
        };
        getExchangeRate();
    },[from,to]);
    useEffect(()=>{
        if(exRate!=null){
            setConverted((amount*exRate).toFixed(2));
        }
    },[amount,exRate]);
    const handleAmount = (e)=>{
        const value = parseFloat(e.target.value);
        setAmount(isNaN(value) ? 0:value);
    };

    const handleFrom = (e)=>{
        setFrom(e.target.value);
    };
    
    const handleTo = (e)=>{
        setTo(e.target.value);
    };
  return (
    <div className="Currency-Container">
        <div className="img-container">
            <img src={Money} alt="image" />
        </div>
        <div className="data-container">
            <h1>Currency Converter</h1>

            <div className="input-container">
            <label htmlFor="amount">Amount :</label>
            <input type="number" id="amount" onChange={handleAmount} value={amount}/>
            </div>

            <div className="input-container">
            <label htmlFor="from">From Currency :</label>
            <select id="from" onChange={handleFrom} value={from}>
            <option value="INR">India Rupees</option>
            <option value="EGP">Egypt Pounds</option>
            <option value="JPY">Japan Yen</option>
            <option value="USD">United States Dollars</option>
	        <option value="EUR">Euro</option>
            </select>
            </div>

            <div className="input-container">
            <label htmlFor="to">To Currency :</label>
            <select id="to" onChange={handleTo}  value={to}>
            <option value="INR">India Rupees</option>
            <option value="EGP">Egypt Pounds</option>
            <option value="JPY">Japan Yen</option>
            <option value="USD">United States Dollars</option>
	        <option value="EUR">Euro</option>
            </select>
            </div>

            <div className="result-data">
                <p><span>{amount} {from}</span> is Equal to <span>{converted} {to}</span></p>
            </div>
        </div>
    </div>
  )
}

export default Currency