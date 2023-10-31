import Axios from "axios";
import "./WeatherComp.css";
import { useState } from "react";

function WeatherComp() {
  let [srch, setSrch] = useState("");
  let [error, setError] = useState("");
  let [visble, setVisible] = useState("resHide");
  let [data, setData] = useState({
    name: "",
    temp: 0,
    humid: 0,
    winspd: 0,
    image: "",
  });
  let { name, temp, humid, winspd, image } = data;

  //Fetch Weather InFo---------------------------------------
  const handleSearch = () => {
    if (srch !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${srch}&appid=f835c526fef65ca74a93b02f2a01736a&units=metric`;

      Axios.get(apiUrl)
        .then((res) => {
          setData({
            ...data,
            name: res.data.name,
            temp: Math.round(res.data.main.temp),
            humid: res.data.main.humidity,
            winspd: res.data.wind.speed,
            image: res.data.weather[0].main,
          });
          setVisible("resVisble");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.message);
          setVisible("resHide");
        });
    }
  };
  //   console.log(srch);
  console.log(data);
  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <span className='material-symbols-outlined'>location_on</span>
        <input
          type='text'
          placeholder='City Name...'
          onChange={(e) => {
            setSrch(e.target.value);
            setError("");
          }}
        />
        <span className='material-symbols-outlined' onClick={handleSearch}>
          search
        </span>
      </div>
      <span className='errmsg'>{error}</span>
      <div className={visble}>
        <p>{name}</p>
        <div>
          <p>{temp}⁰C</p>
          <p>⛅</p>
          <p>{image}</p>
        </div>
        <div>
          <div>
            <span className='material-symbols-outlined'>water_drop</span>
            <p>{humid}%</p>
            <p>Humidity</p>
          </div>
          <div>
            <span className='material-symbols-outlined'>air</span>
            <p>{winspd}km/s</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherComp;
