import { useState } from "react";

import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    const api = "https://susy-server.vercel.app/create";

    const data = {
      user_name: email,
      password: password,
    };

    try {
      // Send POST request
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify content type
        },
        body: JSON.stringify(data), // Convert data to JSON
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      const result = await response.json();
      setMsg(result.message);

      console.log("Login successful:", result);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
      setCheck(false);
      if (msg) {
        alert("Tạo tài khoản thành công!");
      } else {
        alert("Tài khoản đã tồn tại!");
      }
    }
  };

  return (
    <div className="login__container">
      <div className="container form">
        <h1> Đăng Ký</h1>
        <form onSubmit={handleRegister}>
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
              onChange={(e) => setPassword(e.target.value)}
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

        {/* {msg ? (
          <div class="alert alert-danger mt-4" role="alert">
            Tài khoản đã tồn tại!
          </div>
        ) : (
          <div class="alert alert-success mt-4" role="alert">
            Tạo tài khoản thành công!
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Register;
