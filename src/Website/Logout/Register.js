import { useState } from "react";

import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

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

      // Handle the result here (e.g., display a message or redirect)
      console.log("Login successful:", result);
      alert(result.message);

      // Example: Redirect to another page
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setEmail("");
      setPassword("");
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
              onChange={(e) => setEmail(e.target.value)}
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
      </div>
    </div>
  );
}

export default Register;
