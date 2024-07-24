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

  function logout() {
    localStorage.removeItem("cookie");
    window.location.href = "/login";
  }

  async function updateName(name, event) {
    event.preventDefault();
    const api = "https://susy-server.vercel.app/profile/name";
    const body = {
      user_name: localStorage.getItem("data1"),
      password: localStorage.getItem("data2"),
      nick_name: name,
    };

    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("XONG");
  }

  async function updateAvatar(avatar) {
    const api = "https://susy-server.vercel.app/profile/avatar";
    const body = {
      user_name: localStorage.getItem("data1"),
      password: localStorage.getItem("data2"),
      avatar: avatar,
    };

    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
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
    <div>
      <div className="container mt-5">
        <button className="btn btn-primary " onClick={logout}>
          Đăng Xuất
        </button>
      </div>
      <form className="container mt-5 ">
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
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

      <form className="container mt-5 ">
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
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
  );
}

export default Setting;
