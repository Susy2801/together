import { useState, useEffect } from "react";
import "./Weather.css";

function Weather() {
  const sunImg =
    "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png";
  const rainImg =
    "https://cdn2.iconfinder.com/data/icons/weather-365/64/weather-sun-cloud-rain-512.png";
  const heavyImg =
    "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather06-512.png";

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [daily, setDaily] = useState(null);
  const [img, setImg] = useState(null);
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("1");

  const api =
    location === "1"
      ? "https://api.open-meteo.com/v1/forecast?latitude=21.041&longitude=105.886&current=temperature_2m,relative_humidity_2m,is_day,rain,wind_speed_10m&hourly=wind_speed_10m&daily=weather_code&timezone=Asia%2FBangkok"
      : "https://api.open-meteo.com/v1/forecast?latitude=10.823&longitude=106.6296&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m&timezone=Asia%2FBangkok";

  const dailyApi =
    location === "1"
      ? "https://api.open-meteo.com/v1/forecast?latitude=21.0245&longitude=105.8412&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,wind_speed_10m_max&timezone=Asia%2FBangkok&forecast_days=7"
      : "https://api.open-meteo.com/v1/forecast?latitude=10.823&longitude=106.6296&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,wind_speed_10m_max&timezone=Asia%2FBangkok&forecast_days=7";

  const fetchData = async () => {
    try {
      const [currentData, dailyData] = await Promise.all([
        fetch(api).then((res) => res.json()),
        fetch(dailyApi).then((res) => res.json()),
      ]);
      setData(currentData);
      setDaily(dailyData);

      // Xử lý dữ liệu thời tiết hiện tại
      const rain = currentData.current.rain;
      if (rain === 0) {
        setStatus("Trời nắng");
        setImg(sunImg);
      } else if (rain > 0 && rain < 1) {
        setStatus("Mưa nhỏ");
        setImg(rainImg);
      } else if (rain >= 1) {
        setStatus("Mưa rào");
        setImg(heavyImg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [api, dailyApi]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  function formatDay(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  if (isLoading || !data || !daily) {
    return (
      <div className="wea__container2">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="wea__container">
      <div className="wea__box">
        <div>
          <div className="box__now">
            <div className="wea__date">{date.toLocaleString()}</div>
            <img src={img} alt="Weather" className="status__img" />
            <div className="info__location">
              {location === "1" ? "Hà Nội" : "Hồ Chí Minh"}
            </div>
            <div className="info__temp">{data.current.temperature_2m}°C</div>
            <div className="status">{status}</div>

            <div className="box__bottom">
              <div className="bottom__info">
                <div className="bottom__title">Gió 🌪</div>
                <span>{` ${data.current.wind_speed_10m}km/h`}</span>
              </div>
              <div className="bottom__info">
                <div className="bottom__title">Độ ẩm 💧</div>
                <span>{`${data.current.relative_humidity_2m}%`}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Daily */}
        <div className="daily__box">
          {daily.daily.time.slice(1).map((time, index) => (
            <div className="box" key={index}>
              <div className="daily__date">{formatDay(time)}</div>
              <div className="daily__info">
                <div className="min__temp daily__temp">
                  {daily.daily.temperature_2m_min[index + 1]}°C
                </div>
                <div>~</div>
                <div className="max__temp daily__temp">
                  {daily.daily.temperature_2m_max[index + 1]}°C
                </div>
              </div>
              <div className="daily__uv-wind--box">
                <div className="daily__status--box">
                  <i className="fa-solid fa-sun-plant-wilt"></i>
                  <div>{daily.daily.uv_index_max[index + 1]}</div>
                </div>
                <div className="daily__status--box">
                  <i className="fa-solid fa-wind"></i>
                  <div>{daily.daily.wind_speed_10m_max[index + 1]}km/h</div>
                </div>
              </div>
              <div className="daily__sun--box">
                <div className="daily__status--box">
                  <i className="fa-solid fa-sun"></i>
                  <div className="daily__sun">
                    {formatDate(daily.daily.sunrise[index + 1])}
                  </div>
                </div>
                <div className="daily__status--box">
                  <i className="fa-solid fa-moon"></i>
                  <div className="daily__sun">
                    {formatDate(daily.daily.sunset[index + 1])}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* BUTTON */}
        <div className="wea__button--box">
          <div
            className="wea__btn"
            style={{
              backgroundColor: location === "1" ? "#158dac" : "",
              color: location === "1" ? "black" : "white",
            }}
            onClick={() => {
              if (location !== "1") {
                setLocation("1");
                setLoading(true);
              }
            }}
          >
            Hà Nội
          </div>
          <div
            className="wea__btn"
            style={{
              backgroundColor: location === "2" ? "#158dac" : "",
              color: location === "2" ? "black" : "white",
            }}
            onClick={() => {
              if (location !== "2") {
                setLocation("2");
                setLoading(true);
              }
            }}
          >
            Hồ Chí Minh
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
