import "./Weather.css";
import { useState, useEffect } from "react";

function Weather() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const params = {
    latitude: 21.041,
    longitude: 105.886,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "is_day",
      "rain",
      "wind_speed_10m",
    ],
    hourly: "wind_speed_10m",
    daily: "weather_code",
    timezone: "Asia/Bangkok",
  };
  const api =
    "https://api.open-meteo.com/v1/forecast?latitude=21.041&longitude=105.886&current=temperature_2m,relative_humidity_2m,is_day,rain,wind_speed_10m&hourly=wind_speed_10m&daily=weather_code&timezone=Asia%2FBangkok";

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await fetch(api);
        const status = await response.json();
        setData(status);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="wea__container2">
        <div className="loader"></div>
      </div>
    );
  } else {
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
              <div className="info__location">Hà Nội</div>
              <div className="info__temp">
                {data.current.temperature_2m +
                  data.current_units.temperature_2m}
              </div>
            </div>
            <div className="wind__speed">
              {`Gió 🌪 : ${
                data.current.wind_speed_10m + data.current_units.wind_speed_10m
              }`}
            </div>
            <div className="humidity">
              {`Độ ẩm 💧: ${
                data.current.relative_humidity_2m +
                data.current_units.relative_humidity_2m
              }`}
            </div>
            {data.current.rain > 0 && (
              <div className="rain">{`🌧️: ${
                data.current.rain + data.current_units.rain
              }`}</div>
            )}

            <div className="status">Sunny</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
