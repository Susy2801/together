//Route
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

function App() {
  const cookie = localStorage.getItem("cookie");
  if (!cookie) {
    return (
      <div className="App">
        <SideBarX />
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/love" element={<Love />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    );
  }
}

export default App;
