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
  let updatedTemperature = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  updatedTemperature.innerHTML = Math.round(temperature);

  let updatedCity = document.querySelector("#current-city");
  updatedCity.innerHTML = response.data.city;

  let updatedDescription = document.querySelector("#description");
  updatedDescription.innerHTML = response.data.condition.description;

  let updatedHumidity = document.querySelector("#humidity");
  updatedHumidity.innerHTML = `${response.data.temperature.humidity}%`;

  let updatedWind = document.querySelector("#wind");
  updatedWind.innerHTML = `${response.data.wind.speed}m/s`;

  let updatedTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  updatedTime.innerHTML = formatDate(date);

  let updatedIcon = document.querySelector("#current-weather-icon");
  updatedIcon.innerHTML = `<img src="${response.data.condition.icon_url}">`;
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

  return `${day} ${hours}:${minutes} `;
}

let searchBarElement = document.querySelector("#search-form");
searchBarElement.addEventListener("submit", searchFormElement);

searchCity("Sydney");
