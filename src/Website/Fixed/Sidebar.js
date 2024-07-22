import "./Sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
function SideBar() {
  const [width, setWidth] = useState("110px");
  const [isClose, setIsClose] = useState(true);
  const [choose, setChoose] = useState("1");

  function handleBtn() {
    if (!isClose) {
      setWidth("110px");
      setIsClose(true);
    } else {
      setWidth("256px");
      setIsClose(false);
    }
  }

  function handleBlur() {
    // if (!isClose) {
    //   setWidth("110px");
    //   setIsClose(true);
    // }
  }

  return (
    <div
      className="sidebar__container"
      style={{ width: width }}
      onBlur={() => {
        handleBlur();
      }}
    >
      <div className="sidebar__box">
        <button
          className="btn"
          onClick={() => {
            handleBtn();
          }}
        >
          {isClose ? (
            <i class="fa-solid fa-angle-right close__btn"></i>
          ) : (
            <i class="fa-solid fa-angle-left close__btn"></i>
          )}
        </button>
        <div className="sidebar__info--box">
          <img
            src="https://img.freepik.com/free-photo/rendering-bee-anime-character_23-2150963632.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721433600&semt=ais_user"
            alt="avatar"
          />
          {!isClose && <div className="info__name">Trần Diễm Quỳnh</div>}
        </div>
        <div className="sidebar__nav--box">
          <div className="nav__title">Main</div>
          <Link
            to="/"
            onClick={() => {
              setChoose("1");
            }}
          >
            <i
              class="fa-solid fa-house nav__icon"
              style={{
                color: choose === "1" ? "white" : "rgba(255, 255, 255, 0.5)",
              }}
            ></i>
            {!isClose && (
              <div
                className="nav__title"
                style={{
                  color: choose === "1" ? "white" : "rgba(255, 255, 255, 0.5)",
                }}
              >
                {" "}
                Home
              </div>
            )}
          </Link>
          <Link
            to="/weather"
            onClick={() => {
              setChoose("2");
            }}
          >
            <i
              class="fa-solid fa-cloud-sun-rain nav__icon"
              style={{
                color: choose === "2" ? "white" : "rgba(255, 255, 255, 0.5)",
              }}
            ></i>
            {!isClose && (
              <div
                className="nav__title"
                style={{
                  color: choose === "2" ? "white" : "rgba(255, 255, 255, 0.5)",
                }}
              >
                {" "}
                Weather
              </div>
            )}
          </Link>
          <Link
            to="/love"
            onClick={() => {
              setChoose("3");
            }}
          >
            <i
              class="fa-solid fa-heart nav__icon"
              style={{
                color: choose === "3" ? "white" : "rgba(255, 255, 255, 0.5)",
              }}
            ></i>
            {!isClose && (
              <div
                className="nav__title"
                style={{
                  color: choose === "3" ? "white" : "rgba(255, 255, 255, 0.5)",
                }}
              >
                {" "}
                Love
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
