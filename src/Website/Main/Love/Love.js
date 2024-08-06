import { useState, useEffect } from "react";
import "./Love.css";

function Love() {
  const [timeLeft, setTimeLeft] = useState("");
  const [timeLeft2, setTimeLeft2] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [partnerAvatar, setPartnerAvatar] = useState("");
  const [partnerName, setPartnerName] = useState("");

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
    async function getProfile() {
      const api = "https://susy-server.vercel.app/profile";
      const body = {
        user_id: sessionStorage.getItem("id"),
      };
      try {
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        sessionStorage.setItem("partner", data.response.partner_id);
        setAvatar(data.response.avatar);
        setName(data.response.nick_name);
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
  }, []);

  useEffect(() => {
    async function getPartner() {
      const api = "https://susy-server.vercel.app/profile/get_partner";
      const body = {
        partner_id: sessionStorage.getItem("partner"),
      };
      try {
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        setPartnerAvatar(data.response.avatar);
        setPartnerName(data.response.nick_name);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPartner();
  }, [sessionStorage.getItem("partner")]);

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
            <div className="count__title"> BEEN LOVE </div>
            <div className="count__info">
              <div className="left__info">
                <div>{name}</div>
                <img src={avatar} alt="avatar" className="count__avatar" />
              </div>
              <div className="days">{dayBetween("2024/6/5")}</div>
              <div className="right__info">
                <img
                  src={partnerAvatar}
                  alt="avatar"
                  className="count__avatar"
                />
                <div>{partnerName}</div>
              </div>
            </div>
            <div className="days__text">Days</div>
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
