
import { apikey, url } from "./env.js";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


const getWeatherByLocation = async (city) => {

    const apiUrl = url + `?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);
    const responseData = await response.json();

    console.log(responseData);
    addWeatherToPage(responseData);
}

const convertKelvinToCelsius = (temp) => {
    return Math.floor(temp - 273.15);
}

function addWeatherToPage(data) {
    const temp = convertKelvinToCelsius(data.main.temp);
    const feelingTemp = convertKelvinToCelsius(data.main.feels_like);
    const weather = document.createElement("div");

    weather.classList.add("weather");

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C 
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
        <p>Real Feel - <span style="font-size: 40px;font-weight: bold "> ${feelingTemp}°C </span> </p>
        <p>Humidity - <span style="font-size: 20px;font-weight: bold "> ${data.main.humidity}</span> </p>
    `;

    main.innerHTML = "";

    main.appendChild(weather);
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});

export { getWeatherByLocation}