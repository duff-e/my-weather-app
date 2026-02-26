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
  let changeCity = document.querySelector("#current-city");
  changeCity.innerHTML = response.data.city;
  updatedTemperature.innerHTML = Math.round(temperature);
}

let searchBarElement = document.querySelector("#search-form");
searchBarElement.addEventListener("submit", searchFormElement);

searchCity("Sydney");
