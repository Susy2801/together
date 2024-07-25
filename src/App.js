//Route
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Website/Logout/Login";
import Register from "./Website/Logout/Register";
import SideBarX from "./Website/Logout/SidebarX";
import SideBar from "./Website/Fixed/Sidebar";
import Home from "./Website/Main/Home/Home";
import Love from "./Website/Main/Love/Love";
import Weather from "./Website/Main/Weather/Weather";
import Setting from "./Website/Main/Setting/Setting";
import AlertPage from "./Website/Main/Alert Page/Alert";

function App() {
  const cookie = sessionStorage.getItem("cookie");
  if (!cookie) {
    return (
      <div className="App">
        <SideBarX />
        <Routes>
          <Route path="/" element={<AlertPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="App">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/love"
            element={
              sessionStorage.getItem("is_admin") === "true" ? (
                <Love />
              ) : (
                <AlertPage />
              )
            }
          />
          <Route path="/weather" element={<Weather />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    );
  }
}

export default App;
