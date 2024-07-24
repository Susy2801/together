import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const api = "https://susy-server.vercel.app/signin";

    const data = {
      user_name: email,
      password: password,
    };

    try {
      // Send POST request
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      const result = await response.json();

      console.log("Login successful:", result);

      if (result.message) {
        sessionStorage.setItem("data1", email);
        sessionStorage.setItem("data2", password);
        sessionStorage.setItem("cookie", "1");
        sessionStorage.setItem("is_admin", result.response.is_admin);

        setLoading(false);
        setInterval((window.location.href = "/"), 3000);
      } else {
        setLoading(false);
        setCheck(result.message);
        console.log("ĐĂNG NHẬP THẤT BẠI");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="login__container">
      <div className="container form">
        <h1> Đăng nhập</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setCheck(true);
              }}
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setCheck(true);
              }}
              required
            />
          </div>

          <button type="submit" className="btn-primary btn">
            Submit
          </button>
        </form>
        <div className="load__ani mt-5">
          {isLoading && <div class="loader"></div>}
        </div>

        {!check && (
          <div class="alert alert-danger mt-4" role="alert">
            Sai tên đăng nhập hoặc mật khẩu!
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
