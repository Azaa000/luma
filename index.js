const searchInput = document.getElementById("search");
const searchForm = document.getElementById("search-form");
const loadMoreButton = document.getElementById("load-more");
const searchButton = document.getElementById("load-more");
const images = document.getElementById("images");

let currentPage = 0;
let currentSearch = "";

const ACCESS_KEY = "ZTp78Axj9Q0IbdXm0WE_0xwRvH2rFLvCOSSs8WVGpoQ";

const showPhotos = (photos) => {
  photos.forEach((photo) => {
    images.insertAdjacentHTML(
      "beforeend",
      `
            <div class="mb-6 break-inside-avoid overflow-hidden rounded-2xl">
                <img
                src="${photo.urls.small}"
                alt=""
                loading="lazy"
                class="block h-auto w-full"
                />
            </div>
            `,
    );
  });
};

const fetchPhotos = async () => {
  const nextPage = currentPage + 1;
  let url = `https://api.unsplash.com/photos?page=${nextPage}`;

  if (currentSearch !== "") {
    url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(currentSearch)}page=${nextPage}`;
  }

  const response = await fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });

  if (!response.ok) {
    throw new Error(`Зураг авч чадсангүй: ${response.status}`);
  }

  const data = await response.json();

  if (currentSearch) {
    showPhotos(data.results);
  } else {
    showPhotos(data);
  }
  loadMoreButton.textContent = "Load more ↓";
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  currentSearch = searchInput.value.trim();

  currentPage = 0;
  images.innerHTML = "";
  fetchPhotos();
});

loadMoreButton.addEventListener("click", () => {
  if (loadMoreButton.disabled) return;
  fetchPhotos();
});

fetchPhotos();
