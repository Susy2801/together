import { useState, useEffect } from "react";
import "./Love.css";

function Love() {
  const [timeLeft, setTimeLeft] = useState("");
  const [timeLeft2, setTimeLeft2] = useState("");

  function dayBetween(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    const differenceInTime = currentDate.getTime() - givenDate.getTime();

    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  }

  function timeUntil100(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    const targetDate = new Date(givenDate);
    targetDate.setDate(givenDate.getDate() + 100);

    const differenceInTime = targetDate.getTime() - currentDate.getTime();

    if (differenceInTime <= 0) {
      return "Đã qua 100 ngày";
    }

    const days = Math.floor(differenceInTime / (1000 * 3600 * 24));
    const hours = Math.floor(
      (differenceInTime % (1000 * 3600 * 24)) / (1000 * 3600)
    );
    const minutes = Math.floor(
      (differenceInTime % (1000 * 3600)) / (1000 * 60)
    );
    const seconds = Math.floor((differenceInTime % (1000 * 60)) / 1000);

    return `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
  }

  // function daysUntil365(dateString) {
  //   const daysElapsed = dayBetween(dateString);
  //   const daysRemaining = 365 - daysElapsed;

  //   return daysRemaining > 0 ? daysRemaining : 0;
  // }

  function timeUntil365(dates) {
    const givenDate = new Date(dates);
    const currentDate = new Date();

    if (isNaN(givenDate)) {
      return "Ngày không hợp lệ";
    }

    const targetDate = new Date(givenDate);
    targetDate.setDate(givenDate.getDate() + 365);

    const differenceInTime = targetDate.getTime() - currentDate.getTime();

    if (differenceInTime <= 0) {
      return "Đã qua 365 ngày";
    }

    const days = Math.floor(differenceInTime / (1000 * 3600 * 24));
    const hours = Math.floor(
      (differenceInTime % (1000 * 3600 * 24)) / (1000 * 3600)
    );
    const minutes = Math.floor(
      (differenceInTime % (1000 * 3600)) / (1000 * 60)
    );
    const seconds = Math.floor((differenceInTime % (1000 * 60)) / 1000);

    return `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
  }

  useEffect(() => {
    function updateCountdown() {
      const timeLeft = timeUntil365("2024/6/5");
      setTimeLeft2(timeLeft);
    }

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    function updateCountdown() {
      const timeLeft = timeUntil100("2024/6/5");
      setTimeLeft(timeLeft);
    }

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="love__container">
      <div className="love__box">
        <div className="count__box">
          <div className="count__day">
            <div className="count__title"> BEEN LOVE</div>
            <div className="count__info">
              <div>Trần Diễm Quỳnh</div>
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg"
                alt="avatar"
                className="count__avatar"
              />
              <div className="days">{dayBetween("2024/6/5")}</div>
              <img
                src="https://scontent.xx.fbcdn.net/v/t1.15752-9/450757883_1038928704461814_5189994303269445111_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=0024fc&_nc_ohc=7QRTpeRcWG0Q7kNvgGH4pxa&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QG0mnprzJSrob5H3nsox35seuSEVUEzXLEz490tT3GIDA&oe=66C724CA"
                alt="avatar"
                className="count__avatar"
              />
              <div>Nguyễn Việt Duy</div>
            </div>
            <div className="days__text">Day</div>
            <div className="days__date">From 5/6/2024</div>
          </div>
          <div className="mission__box">
            <div className="missions">
              <div className="mission__left">
                <div className="left__text"> ️🎉 Love for 100 days </div>
              </div>
              <div className="mission__right">
                <div className="progress__bar">{timeLeft}</div>
              </div>
            </div>
            <div className="missions">
              <div className="mission__left">
                <div className="left__text"> ️🎉 1 Year Anniversary 🎉 </div>
              </div>
              <div className="mission__right">
                <div className="progress__bar">{timeLeft2} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Love;
