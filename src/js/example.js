"use strict";

const form = document.querySelector("#searchBar");
const input = document.querySelector("#textInput");
const formBtn = document.querySelector("#formBtn");
const failModal = document.querySelector("#failModal");
const app = document.querySelector("#app");
const closeModalBtn = document.querySelector("#closeModalBtn");

const API_KEY = "47351881-fae358547c7b758473d632e4f";

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Formun varsayılan davranışını engelle

  const inputValue = input.value.trim(); // Kullanıcı girişi
  if (inputValue) {
    // input değeri boş değilse
    const searchParams = inputValue.split(" ").join("&"); // Arama parametrelerini düzenle
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchParams}&image_type=photo`;

    console.log(`Arama URL'si: ${BASE_URL}`);

    try {
      fetch(BASE_URL)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("API Yanıtı:", data);
        })
        .catch((error) => {
          console.error("EROR: ", error);
        });
    } catch (error) {
      console.error("Beklenmeyen hata: ", error);
    }

    form.reset(); // Formu temizle
  } else {
    // input değeri boşsa
    failModal.classList.remove("displaying"); // Modal'ı göster
    form.reset(); // Formu temizle
  }
});
