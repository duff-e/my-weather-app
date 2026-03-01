function searchFormElement(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "40o03736bbe0e6faa9b79f5dt4af0a0f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = `${response.data.wind.speed}m/s`;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#current-weather-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}">`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes} `;
}

function displayForecast() {
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-day"> 
      <div class="weather-forecast-date"> ${day} </div>
      <div class="weather-forecast-icon"> 🌨️ </div>
      <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature"> <strong> 23° </strong> </div>
        <div> 16° </div>
      </div>
    </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchBarElement = document.querySelector("#search-form");
searchBarElement.addEventListener("submit", searchFormElement);

searchCity("Sydney");
displayForecast();
