import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
  //   function handleLogin() {
  //     alert();
  //   }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);

  //   const handleLogin = async (event) => {
  //     event.preventDefault();

  //     const api = "https://susy-server.vercel.app/login";

  //     const data = {
  //       user_name: email,
  //       password: password,
  //     };

  //     try {
  //       // Send POST request
  //       const response = await fetch(api, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json", // Specify content type
  //         },
  //         body: JSON.stringify(data), // Convert data to JSON
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       // Parse the JSON response
  //       const result = await response.json();

  //       // Handle the result here (e.g., display a message or redirect)
  //       console.log("Login successful:", result);

  //       // Example: Redirect to another page
  //       // window.location.href = '/dashboard';
  //     } catch (error) {
  //       console.error("There was a problem with the fetch operation:", error);
  //     }
  //   };

  function handleLogin() {
    localStorage.setItem("cookie", "123");
    alert(localStorage.getItem("cookie"));
  }
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
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
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

export default Login;
