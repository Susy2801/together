import "./Home.css";
import { useEffect, useState } from "react";

function Home() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

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
    <div className="home__container">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Tìm người yêu
      </button>

      {/* <!-- Modal --> */}
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
              <div className="friend__box">
                <div className="friend__img--box">
                  <img
                    className="img-thumbnail"
                    alt="avatar"
                    src={sortedUsers[0].avatar}
                  />
                </div>
                <div className="friend__name--box">
                  <div className="friends__name text-light">
                    {sortedUsers[0].nick_name}
                  </div>
                </div>
              </div>
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
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        handleSetPartner(user._id);
                      }}
                    >
                      Chọn 💖
                    </button>
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
  );
}

export default Home;
