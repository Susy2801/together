import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function SideBar() {
  const [width, setWidth] = useState("110px");
  const [isClose, setIsClose] = useState(true);
  const [choose, setChoose] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/weather":
        setChoose("2");
        break;
      // Các đường dẫn khác
      case "/":
        setChoose("1");
        break;
      case "/love":
        setChoose("3");
        break;
      case "/setting":
        setChoose("4");
        break;
      default:
        // Hành động mặc định nếu không khớp đường dẫn nào
        setChoose(0);
    }
  }, [location.pathname]); // Chạy mỗi khi đường dẫn thay đổi

  useEffect(() => {
    async function getProfile() {
      const api = "https://susy-server.vercel.app/profile";
      const body = {
        user_name: sessionStorage.getItem("data1"),
        password: sessionStorage.getItem("data2"),
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
        console.log(data);
        setAvatar(data.response.avatar);
        setName(data.response.nick_name);
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
  }, []);

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
          <img src={avatar} alt="avatar" />
          {!isClose && (
            <div className="info__name">
              {name == undefined ? "Chưa có tên" : name}
            </div>
          )}
        </div>
        <div className="sidebar__nav--box">
          <div className="nav__title">Main</div>
          <Link to="/">
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
          <Link to="/weather">
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
          <Link to="/love">
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
                Love
              </div>
            )}
          </Link>
        </div>
        <div className="setting__box">
          <Link to="/setting" className="setting__link">
            <span
              class="fa-solid fa-gear nav__icon"
              style={{
                color: choose === "4" ? "white" : "rgba(255, 255, 255, 0.5)",
              }}
            ></span>
            {!isClose && (
              <div
                className="nav__title"
                style={{
                  color: choose === "4" ? "white" : "rgba(255, 255, 255, 0.5)",
                }}
              >
                Setting
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
