"use strict";
const form = document.querySelector("#searchBar");
const input = document.querySelector("#textInput");
const formBtn = document.querySelector("#formBtn");
const failModal = document.querySelector("#failModal");
const closeModalBtn = document.querySelector("#closeModalBtn");
const app = document.querySelector("#app");
app.innerHTML = "";
const inputValue = input.value;
let searchParams = "";
const API_KEY = "47351881-fae358547c7b758473d632e4f";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  app.innerHTML = "";
  if (input.value.trim()) {
    const searchParams = input.value.split(" ").join("+");
    // console.log("Search Params: ", searchParams);
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchParams}&image_type=photo`;
    // console.log("BASE_URL: ", BASE_URL);
    try {
      fetch(BASE_URL)
        .then((response) => response.json())
        .then((data) => createImage(data.hits));
    } catch (error) {
      console.error("EROR: ", error);
    }
    form.reset();
  } else {
    console.log("CLASSLIST: ", failModal.classList);
    failModal.classList.remove("displaying");
    app.innerHTML = "";
    form.reset();
  }
});

//CREATE IMAGE

function createImage(image) {
  image.forEach((img) => {
    const imgCard = `
  <div class="imgCard">
        <div class="img">
          <img src=${img.webformatURL} alt="image" />
        </div>
        <div class="card-content">
          <div class="container-content">
            <div class="content-title">Likes</div>
            <div class="content-value">${img.likes}</div>
          </div>
          <div class="container-content">
            <div class="content-title">Views</div>
            <div class="content-value">${img.views}</div>
          </div>
          <div class="container-content">
            <div class="content-title">Comments</div>
            <div class="content-value">${img.comments}</div>
          </div>
          <div class="container-content">
            <div class="content-title">Downloads</div>
            <div class="content-value">${img.downloads}</div>
          </div>
        </div>
      </div>
  `;
    app.innerHTML += imgCard;
  });
}

// CLOSE MODAL
window.addEventListener("click", (event) => {
  if (!event.target.classList.contains("failModal") && !failModal.contains(event.target)) {
    failModal.classList.add("displaying");
    console.log("if: ", event.target);
  } else if (event.target.classList.contains("close")) {
    failModal.classList.add("displaying");
    console.log("else if :", event.target);
  }
});

/**
 *   `<div class="imgCard">
        <div class="img">
          <img src={img.pageURL} alt="image" />
        </div>
        <div class="card-content">
          <div class="container-content">
            <div class="content-title">Likes</div>
            <div class="content-value">Value</div>
          </div>
          <div class="container-content">
            <div class="content-title">Views</div>
            <div class="content-value">Value</div>
          </div>
          <div class="container-content">
            <div class="content-title">Comments</div>
            <div class="content-value">Value</div>
          </div>
          <div class="container-content">
            <div class="content-title">Downloads</div>
            <div class="content-value">Value</div>
          </div>
        </div>
      </div>`
 */
