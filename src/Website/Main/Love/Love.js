import { useState, useEffect } from "react";
import "./Love.css";

function Love() {
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  function calculateDays() {
    const start = new Date(startDate);
    const now = new Date();

    const differenceInMs = now - start;

    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    setDate(days);
  }
  return (
    <div className="love__container">
      <input
        type="date"
        onChange={(e) => {
          setStartDate(e.target.value);
          calculateDays();
        }}
      />
      <div>{date}</div>
    </div>
  );
}

export default Love;
