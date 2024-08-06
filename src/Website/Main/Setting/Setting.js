import { useState } from "react";
import "./Setting.css";
// Hàm chuyển đổi tệp thành base64
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

function Setting() {
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [isLoading, setLoading] = useState(false);

  function logout() {
    sessionStorage.removeItem("cookie");
    sessionStorage.removeItem("data1");
    sessionStorage.removeItem("data2");
    sessionStorage.removeItem("is_admin");
    window.location.href = "/login";
  }

  async function updateName(name, event) {
    event.preventDefault();
    setLoading(true);
    const api = "https://susy-server.vercel.app/profile/name";
    const body = {
      user_id: sessionStorage.getItem("id"),
      nick_name: name,
    };
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  }

  async function updateAvatar(avatar) {
    const api = "https://susy-server.vercel.app/profile/avatar";
    const body = {
      user_id: sessionStorage.getItem("id"),
      avatar: avatar,
    };
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  }

  // Hàm xử lý upload ảnh
  const uploadImg = async (event) => {
    event.preventDefault();
    if (!img) {
      console.log("No image selected");
      return;
    }

    try {
      // Chuyển đổi ảnh sang base64
      const imageBase64 = await getBase64(img);

      // Tạo đối tượng FormData và thêm dữ liệu
      const formData = new FormData();
      formData.append("key", "6ead2f247780bad7962acfa0b89fd4a6"); // Thay thế bằng API key của bạn
      formData.append("image", imageBase64.split(",")[1]); // Chỉ lấy phần dữ liệu base64, bỏ qua phần header

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      // Kiểm tra phản hồi từ server
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Xử lý dữ liệu phản hồi
      const data = await response.json();
      console.log("Upload successful:", data);
      updateAvatar(data.data.display_url);
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div className="setting__container ">
      <div className="avatar container">
        <form className=" mt-5 ">
          <div className="mb-3 ">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-warning"
            >
              Cập nhật ảnh đại diện
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={(e) => setImg(e.target.files[0])}
              aria-describedby="emailHelp"
            />
          </div>
          <button
            className="btn-primary btn"
            onClick={(e) => {
              uploadImg(e);
            }}
          >
            Submit
          </button>
        </form>
      </div>

      <div className="avatar container">
        <form className="mt-5 ">
          <div className="mb-3 ">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-warning"
            >
              Cập nhật tên
            </label>
            <input
              type="text"
              className="form-control"
              id="image"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby="emailHelp"
            />
          </div>
          <button
            className="btn-primary btn"
            onClick={(e) => {
              updateName(name, e);
            }}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="logout mt-5">
        <button
          className="btn  btn-outline-danger"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#logoutModal"
        >
          Đăng Xuất
        </button>
        <div className="avatar container mt-5 loading__screen">
          {isLoading && <div className="loader"></div>}
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="logoutModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog ">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Chắc chắn chưa?
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-danger">Đăng xuất khỏi tài khoản?</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button type="button" class="btn btn-danger" onClick={logout}>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
