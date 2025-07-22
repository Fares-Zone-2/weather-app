import { useState, useEffect } from "react";
import "weather-icons/css/weather-icons.min.css";
import { FaDroplet } from "react-icons/fa6";
import { GiStripedSun } from "react-icons/gi";
import { FaWind } from "react-icons/fa";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
export default function GetWeatherIcon() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [activeIcon, setActiveIcon] = useState(null);
  const [main, setMain] = useState([]);
  const [weather, setWeather] = useState();
  const [wind, setWind] = useState(null);
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const getWeatherIcon = (owmIcon) => {
    const iconMap = {
      "01d": "wi-day-sunny",
      "01n": "wi-night-clear",
      "02d": "wi-day-cloudy",
      "02n": "wi-night-alt-cloudy",
      "03d": "wi-cloud",
      "03n": "wi-cloud",
      "04d": "wi-cloudy",
      "04n": "wi-cloudy",
      "09d": "wi-showers",
      "09n": "wi-showers",
      "10d": "wi-day-rain",
      "10n": "wi-night-alt-rain",
      "11d": "wi-thunderstorm",
      "11n": "wi-thunderstorm",
      "13d": "wi-snow",
      "13n": "wi-snow",
      "50d": "wi-fog",
      "50n": "wi-fog",
    };
    return iconMap[owmIcon] || "wi-na";
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=riyadh&appid=${API_URL}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setActiveIcon(getWeatherIcon(data.weather[0].icon));
        setMain(data.main);
        setWeather(data.weather);
        setWind(data.wind);
        console.log(data);
        const sunriseUTC = new Date(data.sys.sunrise * 1000); // UTC time

        const sunriseLocal = sunriseUTC.toLocaleTimeString("en-sa", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        setSunrise(sunriseLocal);
        const sunsetUTC = new Date(data.sys.sunset * 1000); // UTC time

        const sunsetLocal = sunsetUTC.toLocaleTimeString("en-sa", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        setSunrise(sunriseLocal);
        setSunset(sunsetLocal);
      });
  }, []);
  return (
    <div className="main">
      <div className="flex justify-between">
        <i className={`wi ${activeIcon} text-9xl text-yellow-50`}></i>
        <div className="info">
          <span className="block text-white text-5xl relative">
            {main.temp}
            <span className="absolute w-4 h-4 rounded-full border-5 border-white left-[-15px]"></span>
          </span>
          <span className="block text-white text-xl mt-2">
            {weather && weather[0].description}
          </span>
        </div>
      </div>
      <ul className="info flex items-center justify-between mt-9">
        <li className="text-center w-fit text-white text-xl">
          High:
          <span className="text-white block text-lg border-2 mt-3  p-2 rounded-lg">
            {Math.round(main.temp_max)}
          </span>
        </li>
        <li className="text-center w-fit text-white text-xl">
          Low:
          <span className="text-white block text-lg border-2 mt-3  p-2 rounded-lg">
            {Math.round(main.temp_min)}
          </span>
        </li>
        <li className="text-center w-fit text-white text-sm">
          Wind:
          <span className="text-white block text-lg border-2 mt-3  p-2 rounded-lg">
            {wind && wind.speed} km
          </span>
        </li>
      </ul>
      <div className="cont grid grid-cols-2 gap-3 mt-20">
        <div className="info rounded-md flex flex-col items-center justify-center p-5 bg-[#22212167]">
          <GiStripedSun className="text-yellow-500 text-3xl" />
          <span className="text-white text-lg font-bold">UV index</span>
          <span className="text-[#ccc] text-lg">low</span>
        </div>
        <div className="info rounded-md flex flex-col items-center justify-center p-5 bg-[#22212167]">
          <FaDroplet className="text-white text-3xl" />
          <span className="text-white text-lg font-bold">Humidity</span>
          <span className="text-[#ccc] text-lg">10%</span>
        </div>
        <div className="info rounded-md flex flex-col items-center justify-center p-5 bg-[#22212167]">
          <FaWind className="text-white text-3xl" />
          <span className="text-white text-lg font-bold">Wind</span>
          <span className="text-[#ccc] text-lg">{wind && wind.speed} km/h</span>
        </div>
        <div className="info rounded-md flex items-center justify-between p-5 bg-[#22212167]">
          <div className="raise flex flex-col items-center justify-center">
            <WiSunrise className="text-yellow-500 text-4xl font-bold" />
            <span className="text-white text-lg font-bold">Sunrise</span>
            <span className="text-[#ccc] text-lg">{sunrise}</span>
          </div>
          <div className="set flex flex-col items-center justify-center">
            <WiSunset className="text-yellow-500 text-4xl font-bold" />
            <span className="text-white text-lg font-bold">Sunset</span>
            <span className="text-[#ccc] text-lg">{sunset}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
