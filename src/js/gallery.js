const form = document.querySelector("#searchBar");
const input = document.querySelector("#textInput");
const formBtn = document.querySelector("#formBtn");

const BASE_URL = "pixabay.com/api/?key=47351881-fae358547c7b758473d632e4f";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
  }
  console.log(input.value);
});
