import axios from "axios";
import "./weather.css";
import { useEffect, useState } from "react";

const WEATHER_API_KEY = "a39cbac3ab591216905dc563049a4122";

const Weather = () => {
  const [city, setCity] = useState("");
  const [dataWeather, setDataWeather] = useState({});

  useEffect(() => {
    console.log(dataWeather);
  }, [dataWeather]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const reFormData = (basedata) => {
    const Obj = {
      nameCity: basedata.name,
      temp: basedata.main.temp,
      humidity: basedata.main.humidity,
      wind: basedata.wind.speed,
      des: basedata.weather[0].description,
      icon: basedata.weather[0].icon,
    };
    setDataWeather(Obj);
  };

  //fetch API
  const handleClick = async () => {
    try {
      let res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
      );
      reFormData(res.data);
    } catch (err) {
      console.log(err.response.data.message);
      if (err.response.data.message === "city not found") {
        setDataWeather({ state: "city not found" });
      }
    }
  };
  return (
    <div className="container-weather">
      <div className="search-box">
        <i className="fas fa-map-marker-alt"></i>
        <input
          type="text"
          placeholder="Enter your location"
          value={city}
          onChange={handleChange}
        />
        <button className="fas fa-search" onClick={handleClick}></button>
      </div>
      {dataWeather.state ? (
        <h3 className="notFound">{dataWeather.state}</h3>
      ) : (
        <div className="box-content">
          <h4 className="city"> {dataWeather.nameCity} </h4>
          <div className="weather-box">
            {/* tuy bien phu thuoc vao gia tri thoi tiet tra ve là */}
            <img
              src={`https://openweathermap.org/img/wn/${dataWeather.icon}@2x.png`}
            />
            <div className="TextContent">
              {/* hien thi nhiet do */}
              <span className="temperature">
                {" "}
                {parseFloat(dataWeather.temp).toFixed(1)} ℃
              </span>

              {/* mo tar tình trạng thời tiết lúc đó */}
              <span className="description"> {dataWeather.des}</span>
            </div>
          </div>

          <div className="weather-details">
            <div className="humidity">
              <i className="fas fa-water"></i>
              <div className="text">
                <span>{dataWeather.humidity}</span>
                <p>Humidity</p>
              </div>
            </div>
            <div className="wind">
              <i className="fas fa-wind"></i>
              <div className="text">
                <span>{dataWeather.wind}</span>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
