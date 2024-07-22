import "./App.css";
//Route
import { Routes, Route } from "react-router-dom";
import SideBar from "./Website/Fixed/Sidebar";
import Home from "./Website/Main/Home/Home";
import Love from "./Website/Main/Love/Love";
import Weather from "./Website/Main/Weather/Weather";

function App() {
  return (
    <div className="App">
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/love" element={<Love />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
