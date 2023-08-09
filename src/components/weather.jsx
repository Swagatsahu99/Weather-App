import React from 'react'

import { CircularProgress, Slide, TextField } from "@mui/material";
import { useEffect, useState } from "react";


const Weather = () => {

    const [city, setCityName] = useState("Bengaluru");
    const [inputText, setInputText] = useState("");
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const[time,setTime]=useState(new Date());
  
    useEffect(() => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=189271b827844bff7388350c44848615&units=metric`
      )
        .then((res) => {
          if (res.status === 200) {
            error && setError(false);
            return res.json();
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((data) => {
          setData(data);
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }, [city, error]);


    const handleSearch = (e) => {
      if (e.key === "Enter") {
        setCityName(e.target.value);
        setInputText("");
      }
    };

    useEffect(()=>{
      setInterval(()=>setTime(new Date()),1000)
    },[])
  

    // console.log(time.toLocaleTimeString());

    const today=new Date()

    const f= new Intl.DateTimeFormat("en-us",{
      dateStyle:"full",
      timeStye:"full",
    })


  return (
    <div className="weather-page">
        <div className="bg">

        </div>
        <div className="bg-content">
        {!loading ? (
        <>
          <TextField
            variant="filled"
            label="Search location"
            className="input"
            error={error}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleSearch}
          />
          <h1 className="city">{data.name}</h1>

          
          {/* date & time */}

          <h1>{f.format(today)}</h1>

          <h3>{time.toLocaleTimeString()}</h3>

          {/* weather status */}

          <div className="group">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt=""
            />
            <h1>{data.weather[0].main}</h1>
          </div>

          {/* weather description */}

          <h2>{data.weather[0].description}</h2>

          {/* weather details           */}

          <Slide direction="right" timeout={800} in={!loading}>
            <div className="box_container">
             
             {/* temprature */}
              <div className="box">
                <p>Temprature</p>
                <h1>{data.main.temp.toFixed()} °C</h1>
              </div>

              {/* humidity */}
              <div className="box">
                <p>Humidity</p>
                <h1>{data.main.humidity.toFixed()}%</h1>
              </div>

              <div className="box">
                <p>Wind</p>
                <h1>{data.wind.speed.toFixed()} km/h</h1>
              </div>

              <div className="box">
                <p>Feels Like</p>
                <h1>{data.main.feels_like.toFixed()} °C</h1>
              </div>
              <div className="box">
                <p>Pressure</p>
                <h1>{data.main.pressure}</h1>
              </div>
              <div className="box">
                <p>Direction</p>
                <h1>{data.wind.deg.toFixed()}°</h1>
              </div>
            </div>
          </Slide>
        </>
      ) : (
        <CircularProgress />
      )}
        </div>
    </div>
  )
}

export default Weather