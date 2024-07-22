import "./Weather.css";
import { useState, useEffect } from "react";

function Weather() {
  const api = `https://api.open-meteo.com/v1/forecast?latitude=21.0245&longitude=105.8412&current=temperature_2m,relative_humidity_2m,is_day&timezone=Asia%2FBangkok`;
  const [data, setData] = useState([]);
  useEffect(() => {
    const getStatus = async () => {
      const response = await fetch(api);
      setData(response);
      console.log(data);
    };

    getStatus();
  }, []);

  return (
    <div className="wea__container">
      <div className="wea__box">
        <div className="box">
          <img
            src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
            alt="Sun"
            className="status__img"
          />
          <div className="box__info">
            <div>Hanoi</div>
            <div>25C</div>
          </div>
          <div className="wind__speed">Wind Speed: 11 km/h</div>
          <div className="status">Sunny</div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
