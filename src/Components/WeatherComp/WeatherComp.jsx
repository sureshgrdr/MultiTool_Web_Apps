import Axios from "axios";
import "./WeatherComp.css";
import { useState } from "react";
import { imgInfo } from "../Assets/Assets";

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
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.message);
          setVisible("resHide");
        });
    }
  };

  return (
    <div>
      <div className='container'>
        <h1>Weather App</h1>
        <div className='searchBox'>
          <span className='material-symbols-outlined'>location_on</span>
          <input
            type='text'
            placeholder='City Name...'
            spellcheck='false'
            onChange={(e) => {
              setSrch(e.target.value);
              setVisible("resHide");
              setError("");
            }}
            onKeyDown={(e) => {
              return e.key === "Enter" ? handleSearch() : "";
            }}
          />
          <span className='material-symbols-outlined' onClick={handleSearch}>
            search
          </span>
        </div>
        <span className='errmsg'>{error}</span>
        <div className={visble}>
          <h2>{name}</h2>
          <p className='imgInfo'>{image}</p>
          {imgInfo
            .filter((itm) => {
              return itm.name === image;
            })
            .map((item, i) => {
              return <img src={item.imgpic} alt={image} className='mainImg' key={i} draggable='false' />;
            })}

          <p className='celcInfo '>{temp}°c</p>
          <div className='otherInfo '>
            <div>
              <span className='material-symbols-outlined humid'>water_drop</span>
              <p>{humid}%</p>
              <p>Humidity</p>
            </div>
            <p>⁝</p>
            <div>
              <span className='material-symbols-outlined wind'>air</span>
              <p>{winspd}km/s</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherComp;
