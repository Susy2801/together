import { useState, useEffect } from "react";
import "./Love.css";

function Love() {
  function dayBetween(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    const differenceInTime = currentDate.getTime() - givenDate.getTime();

    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  }

  function daysUntil100(dateString) {
    const daysElapsed = dayBetween(dateString);
    const daysRemaining = 100 - daysElapsed;

    return daysRemaining > 0 ? daysRemaining : 0;
  }
  function daysUntil365(dateString) {
    const daysElapsed = dayBetween(dateString);
    const daysRemaining = 365 - daysElapsed;

    return daysRemaining > 0 ? daysRemaining : 0;
  }

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
                src="https://preview.redd.it/tried-to-make-an-anime-like-version-of-my-avatar-using-a-i-v0-2dmjoo8g1g5a1.jpg?width=1080&crop=smart&auto=webp&s=d347a673b742e4c2bad3e00085ee7fdb141b1fa2"
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
                <div className="progress">
                  {daysUntil100("2024/5/6")} days left
                </div>
              </div>
            </div>
            <div className="missions">
              <div className="mission__left">
                <div className="left__text"> ️🎉 Love for 365 days </div>
              </div>
              <div className="mission__right">
                <div className="progress">
                  {daysUntil365("2024/6/5")} days left
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Love;
