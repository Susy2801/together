import "./App.css";
//Route
import { Routes, Route } from "react-router-dom";
import SideBar from "./Website/Fixed/Sidebar";
import Home from "./Website/Main/Home/Home";
import Love from "./Website/Main/Love/Love";
import Weather from "./Website/Main/Weather/Weather";
import Setting from "./Website/Main/Setting/Setting";

function App() {
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

export default App;
