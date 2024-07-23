import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SidebarX.css";

function SideBarX() {
  const [width, setWidth] = useState("110px");
  const [isClose, setIsClose] = useState(true);
  const [choose, setChoose] = useState(null);

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
          className="btnn"
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
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="avatar"
          />
        </div>
        <Link to="/login" className="login__box">
          <i class="fa-solid fa-user"></i>
          {!isClose && <div className="login__title"> Login </div>}
        </Link>
        <Link to="/register" className="login__box">
          <i class="fa-solid fa-user-plus"></i>
          {!isClose && <div className="login__title"> Register </div>}
        </Link>
      </div>
    </div>
  );
}

export default SideBarX;
