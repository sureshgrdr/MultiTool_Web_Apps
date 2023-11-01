import Rain from "./weather_images/rainfall-100.png";
import Clouds from "./weather_images/clouds-100.png";
import Mist from "./weather_images/mist-100.png";
import Clear from "./weather_images/sun-100.png";
import Haze from "./weather_images/haze-100.png";
import Smoke from "./weather_images/smoke-100.png";
import Snow from "./weather_images/snow-100.png";

export const imgInfo = [];

function ImgConvert(name, imgpic) {
  imgInfo.push({ name: name, imgpic: imgpic });
}

new ImgConvert("Mist", Mist);
new ImgConvert("Rain", Rain);
new ImgConvert("Clouds", Clouds);
new ImgConvert("Clear", Clear);
new ImgConvert("Haze", Haze);
new ImgConvert("Smoke", Smoke);
new ImgConvert("Snow", Snow);
