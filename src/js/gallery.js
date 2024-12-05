"use strict";
//IMPORT
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

//VARIABLES
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

//LOADER
const loader = document.querySelector(".loader");
function showLoader() {
  loader.classList.remove("hidden");
}
function hiddeLoader() {
  loader.classList.add("hidden");
}

//CREATE IMAGE ELEMENTS
form.addEventListener("submit", (e) => {
  e.preventDefault();
  app.innerHTML = "";
  showLoader();
  if (input.value.trim()) {
    const searchParams = input.value.split(" ").join("+");
    // console.log("Search Params: ", searchParams);
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchParams}&image_type=photo`;
    // console.log("BASE_URL: ", BASE_URL);
    try {
      fetch(BASE_URL)
        .then((response) => response.json())
        .then((data) => {
          hiddeLoader();
          createImage(data.hits);
          //SIMPLE LIGHTBOX
          const lightbox = new SimpleLightbox(".gallery a", {
            captionsData: "alt",
            captionDelay: 250,
            close: true,
            scrollZoom: false,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          failModal.classList.remove("displaying");
          failModal.textContent = "An error occurred. Please try again!";
        });
    } catch (error) {
      console.error("EROR: ", error);
    }
    form.reset();
  } else {
    // console.log("CLASSLIST: ", failModal.classList);
    failModal.classList.remove("displaying");
    app.innerHTML = "";
    hiddeLoader();
    form.reset();
  }
});

//CREATE IMAGE

function createImage(image) {
  image.forEach((img) => {
    const imgCard = `
  <li class="imgCard">
        <a class="imgTag" href="${img.largeImageURL}">
          <img class="img" src=${img.webformatURL} alt=${img.tags} />
        </a>
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
      </li>
  `;
    app.innerHTML += imgCard;
  });
}

// CLOSE MODAL
window.addEventListener("click", (event) => {
  if (!event.target.classList.contains("failModal") && !failModal.contains(event.target)) {
    failModal.classList.add("displaying");
    // console.log("if: ", event.target);
  } else if (event.target.classList.contains("close")) {
    failModal.classList.add("displaying");
    // console.log("else if :", event.target);
  }
});
