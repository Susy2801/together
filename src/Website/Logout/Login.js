import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
        localStorage.setItem("data1", email);
        localStorage.setItem("data2", password);
        localStorage.setItem("cookie", "1");
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
        {isLoading && <div class="loader"></div>}

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
