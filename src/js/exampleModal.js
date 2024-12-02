import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const imgContainer = document.querySelector(".gallery");

images.forEach((image) => {
  const imgElement = `<li class="gallery-item">
    <a class="gallery-link" href="${image.original}">
      <img
        class="gallery-image"
        src="${image.preview}"
        data-source="${image.original}"
        alt="${image.description}"
      />
    </a>
  </li>`;
  imgContainer.innerHTML += imgElement;
});

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  close: true,
  scrollZoom: false,
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.close();
  }
});
