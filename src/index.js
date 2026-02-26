function searchFormElement(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let changeCity = document.querySelector("#current-city");
  changeCity.innerHTML = searchInput.value;
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", searchFormElement);
