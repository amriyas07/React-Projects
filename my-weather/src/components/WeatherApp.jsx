import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import searchIco from "../assets/glass.png";
import dclearsky from "../assets/dclear sky.png";
import nclearsky from "../assets/nclear sky.png";
import dCloud from "../assets/dcloud.png";
import nCloud from "../assets/ncloud.png";
import dnsCloud from "../assets/dnsclouds.png";
import bnsCloud from "../assets/dnbclouds.png";
import dnsRain from "../assets/dnsrain.png";
import dRain from "../assets/drain.png";
import nRain from "../assets/nrain.png";
import dnStorm from "../assets/dnstorm.png";
import dnSnow from "../assets/dnsnow.png";
import humidity from "../assets/humidity.png";
import weather from "../assets/weather.png";
import "../components/weather.css";
const WeatherDet = ({icon,temp,city,country,latitude,longitude,humid,wind,cityNotFound})=>{
  return(
    <>
    <div className="images">
      <img src={icon} alt="Image" />
    </div>
    <div className="temp">{temp} {'\u00b0'}C</div>
    <div className="city">{city}</div>
    <div className="country">{country}</div>
    <div className="co-ord">
      <div>
        <span className="lat">Latitude</span>
        <span>{latitude}</span>
      </div>
      <div>
        <span className="long">Longitude</span>
        <span>{longitude}</span>
      </div>
    </div>
    <div className="datacontainer">
      <div className="element">
        <img src={humidity} alt="Image" />
        <div className="data">
          <div className="humi-perc">{humid}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>

      <div className="element">
        <img src={weather} alt="Image" />
        <div className="data">
          <div className="wind-perc">{wind} km/hr</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
    </>
  );
};
WeatherDet.propTypes = {
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  latitude:PropTypes.number.isRequired,
  longitude:PropTypes.number.isRequired,
  humid:PropTypes.number.isRequired,
  wind:PropTypes.number.isRequired
};
function WeatherApp() {
  let api_key = "6e6c974ea0bd0ab9c343bb145a8d23cd";
  const [text,setText] = useState("Villupuram");
  const [icon,setIcon] = useState(dnSnow);
  const [temp,setTemp] = useState(0);
  const [city,setCity] = useState("Villupuram");
  const [country,setCountry] = useState("IN");
  const [latitude,setLatitude] = useState(0.1234);
  const [longitude,setLongitude] = useState(1.234);
  const [humid,setHumid] = useState(85);
  const [wind,setWind] = useState(43);
  const [cityNotFound,setCitynotFound] = useState(false);
  const [load,setLoad] = useState(false);
  const [error,setError] = useState(null);

  const WeatherIconMap = {
    "01d":dclearsky,
    "01n":nclearsky,
    "02d":dCloud,
    "02n":nCloud,
    "03d":dnsCloud,
    "03n":dnsCloud,
    "04d":bnsCloud,
    "04n":bnsCloud,
    "09d":dnsRain,
    "09n":dnsRain,
    "10d":dRain,
    "10n":nRain,
    "11d":dnStorm,
    "11n":dnStorm,
    "13d":dnSnow,
    "13n":dnSnow,
  };

  const search = async ()=>{
    setLoad(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
    try{
      let res = await fetch(url);
      let data = await res.json();
      if(data.cod==="404"){
        console.log("City Not Found");
        setCitynotFound(true);
        setLoad(false);
        return;
      }
      setTemp(Math.floor(data.main.temp));
      setCountry(data.sys.country);
      setWind(data.wind.speed);
      setLatitude(data.coord.lat);
      setLongitude(data.coord.lon);
      setHumid(data.main.humidity);
      setCity(data.name);
      const weatherIconCode = data.weather[0].icon;
      setIcon(WeatherIconMap[weatherIconCode] || clearsky);
      setCitynotFound(false);
    }catch(error){
      console.log("An error Occurred",error.message);
      setError("An Error Occured to Fetch the City");
    }
    finally{
      setLoad(false);
    }
  };
  const handleCity= (e)=>{
    setText(e.target.value);
  };
  const handlekeyDown=(e) =>{
    if(e.key==="Enter"){
      search();
    }
  };
  useEffect(function () {
      search();
  },[]);
  return (
    <>
    <div className="container">
     <div className="Search_cont">
            <input type="text" className="search_input" placeholder="Enter city name" onChange={handleCity} value={text} onKeyDown={handlekeyDown}/>
            <div className="searchIcon">
                <img src={searchIco} alt="Image" onClick={()=> search()}/>
            </div>
            
        </div>
        {load && <div className="loadings">Loading...</div>}
    {error && <div className="errormess">{error}</div>}
    {cityNotFound && <div className="citynot">City Not Found</div>}
        {!load && !cityNotFound && <WeatherDet icon={icon} temp={temp} city={city} country={country} latitude={latitude} longitude={longitude} humid={humid} wind={wind} cityNotFound={cityNotFound}/>}
    </div>
    </>
    
  );
}

export default WeatherApp