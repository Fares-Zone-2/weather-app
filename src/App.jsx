import { useState, useEffect } from "react";
import "weather-icons/css/weather-icons.css";
import "./App.css";

import GetWeatherIcon from "./GetWeatherI";

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [weather, setWeather] = useState(null);

  const activIcon = `https://openweathermap.org/img/wn/01d@4x.png`;
  return (
    <>
      <section className="h-screen">
        <div className="container m-auto p-5">
          <input
            className="bg-white border border-[#ccc] outline-[#ccc] rounded-md p-3 text-xl w-full"
            type="text"
            placeholder="Search"
          />
          <h1 className="text-white text-5xl font-bold mt-5">Weather</h1>
          <div className="div mt-20">
            <GetWeatherIcon />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
