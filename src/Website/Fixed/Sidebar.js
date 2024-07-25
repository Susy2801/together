import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { Button } from "bootstrap";

function SideBar() {
  const [width, setWidth] = useState("110px");
  const [isClose, setIsClose] = useState(true);
  const [choose, setChoose] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

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
        sessionStorage.setItem("_id", data.response._id);
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

  useEffect(() => {
    async function getAll() {
      setLoading(true);
      try {
        const api = "https://susy-server.vercel.app/check";
        const response = await fetch(api);
        const data = await response.json();
        setUsers(data.response); // Assuming data.response contains the user data
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false); // Ensure loading state is reset even if an error occurs
      }
    }

    // Fetch data when component mounts
    getAll();
  }, []);

  async function handleSetPartner(id) {
    setLoading(true);
    const api = "https://susy-server.vercel.app/profile/set_partner";
    const body = {
      user_name: sessionStorage.getItem("data1"),
      password: sessionStorage.getItem("data2"),
      partner_id: id,
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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const userId = sessionStorage.getItem("_id");

  const currentUser = users.find((user) => user._id === userId);
  const otherUsers = users.filter((user) => user._id !== userId);

  const sortedUsers = currentUser ? [currentUser, ...otherUsers] : otherUsers;
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
          <Link
            className="setting__link"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <span
              class="fa-solid fa-user-group nav__icon"
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
                Partner
              </div>
            )}
          </Link>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content bg-dark">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Tìm kiếm ngừi iu
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {isLoading ? (
                    <div className="friend__box">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    sortedUsers.map((user, index) => (
                      <div className="friend__box" key={index}>
                        <div className="friend__img--box">
                          <img
                            className="img-thumbnail"
                            alt="avatar"
                            src={user.avatar}
                          />
                        </div>
                        <div className="friend__name--box">
                          <div className="friends__name text-light">
                            {user.nick_name}
                          </div>
                        </div>

                        {user._id === sessionStorage.getItem("_id") ? (
                          <div></div>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              handleSetPartner(user._id);
                            }}
                          >
                            Chọn 💖
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Bỏ qua
                  </button>
                  <button type="button" className="btn btn-primary">
                    Được rùi cưới thui
                  </button>
                </div>
              </div>
            </div>
          </div>
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
