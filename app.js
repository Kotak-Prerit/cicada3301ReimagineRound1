const menu = document.querySelector(".menu");
const navbar = document.querySelector(".navbar");
const toolbox = document.querySelector(".toolBox");
const slider = document.querySelector(".slider-wrapper");
const slider_item = document.querySelector(".slider-item");
const left = document.querySelector(".btn-left");
const right = document.querySelector(".btn-right");
const character_wrapper = document.querySelector(".char-img-wrapper");
const images = document.querySelectorAll(".char-img");
const arrow = document.querySelector(".arrow");
const cursor = document.querySelector(".cursor");
const arcade = document.querySelector(".arcade");
const coin = document.querySelector(".coin");
const mario = document.querySelector(".jumpMario");
const merchandise = document.querySelector(".m-logo");
const controller = document.querySelector(".controller");
const overlay = document.querySelector(".overlay");
const vanish = document.querySelector(".close");
const title = document.querySelector(".title");
const line1 = document.querySelector(".top");
const line2 = document.querySelector(".middle");
const line3 = document.querySelector(".bottom");

//Menu
menu.addEventListener("click", function () {
  toolbox.classList.toggle("menuActive");
  line1.classList.toggle("light");
  line2.classList.toggle("light");
  line3.classList.toggle("light");
  navbar.classList.toggle("menuOpen");
});

//Slider Desktop
slider.addEventListener("mousedown", (a) => {
  slider.dataset.mouseDownAt = a.clientX;
  slider.classList.add("grabbing");
  cursor.style.display = "none";
});

slider.addEventListener("mousemove", (e) => {
  const rect = slider.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  let isDragging = false;

  slider.addEventListener("mousedown", () => {
    isDragging = true;
  });

  slider.addEventListener("mouseup", () => {
    isDragging = false;
  });

  if (!isDragging) {
    cursor.style.transform = `translate(${x - 50}px, ${y - 20}px)`;
  }
});

slider.addEventListener("mousemove", (e) => {
  if (slider.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(slider.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 1.5;

  const percentage = (mouseDelta / maxDelta) * -75,
    nextPercentageUnconstrained =
      parseFloat(slider.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -75);

  slider.dataset.percentage = nextPercentage;

  slider.style.transform = `translate(${nextPercentage}%, -50%)`;
});

slider.addEventListener("mouseup", () => {
  slider.dataset.mouseDownAt = "0";
  slider.dataset.prevPercentage = slider.dataset.percentage;
  slider.classList.remove("grabbing");
  cursor.style.display = "flex";
});

slider.addEventListener("mouseleave", () => {
  if (slider.classList.contains("grabbing")) {
    slider.dataset.mouseDownAt = "0";
    slider.dataset.prevPercentage = slider.dataset.percentage;
    slider.classList.remove("grabbing");
  }
});

// Slider Mobile
slider.addEventListener("touchstart", (e) => {
  slider.dataset.mouseDownAt = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e) => {
  if (slider.dataset.mouseDownAt === "0") return;
  const mouseDelta =
    parseFloat(slider.dataset.mouseDownAt) - e.touches[0].clientX;
  const maxDelta = window.innerWidth / 1.5;
  const percentage = (mouseDelta / maxDelta) * -75;
  const nextPercentageUnconstrained =
    parseFloat(slider.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    -75
  );
  slider.dataset.percentage = nextPercentage;
  slider.style.transform = `translate(${nextPercentage}%, -50%)`;
});

slider.addEventListener("touchend", () => {
  slider.dataset.mouseDownAt = "0";
  slider.dataset.prevPercentage = slider.dataset.percentage;
  slider.classList.remove("grabbing");
});

//Carausol
const numImages = images.length;
let translation = 0;

left.addEventListener("click", () => {
  arrow.style.display = "none";
  if (translation < 0) {
    translation += 100;
    character_wrapper.style.transform = `translateX(${translation}%)`;
  }
});

right.addEventListener("click", () => {
  arrow.style.display = "none";
  if (translation > -100 * (numImages - 1)) {
    translation -= 100;
    character_wrapper.style.transform = `translateX(${translation}%)`;
  }
});

// store section
arcade.addEventListener("click", () => {
  arcade.style.zIndex = "11";
  overlay.style.display = "flex";
  title.innerHTML = "Store";
});
mario.addEventListener("click", () => {
  mario.style.zIndex = "11";
  overlay.style.display = "flex";
  title.innerHTML = "Characters";
});
coin.addEventListener("click", () => {
  coin.style.zIndex = "11";
  overlay.style.display = "flex";
  title.innerHTML = "sales & deals";
});
merchandise.addEventListener("click", () => {
  merchandise.style.zIndex = "11";
  overlay.style.display = "flex";
  title.innerHTML = "merchandise";
});
controller.addEventListener("click", () => {
  controller.style.zIndex = "11";
  overlay.style.display = "flex";
  title.innerHTML = "gaming systems";
});

vanish.addEventListener("click", () => {
  overlay.style.display = "none";
  arcade.style.zIndex = "1";
  coin.style.zIndex = "1";
  mario.style.zIndex = "2";
  merchandise.style.zIndex = "1";
  controller.style.zIndex = "1";
});

// best seller scroll
const productCarousel = document.getElementById("product-carousel");
const products = productCarousel.children;
const numProducts = products.length;
const scrollWidth = 300;
let currentScrollPosition = 0;

function scrollLeft() {
  currentScrollPosition -= scrollWidth;
  if (currentScrollPosition < -1500) {
    currentScrollPosition = -1500;
  }
  productCarousel.style.transform = `translateX(${currentScrollPosition}px)`;
  console.log(currentScrollPosition);
}

function scrollRight() {
  if (currentScrollPosition < 0) {
    currentScrollPosition += scrollWidth;
  }
  productCarousel.style.transform = `translateX(${currentScrollPosition}px)`;
  console.log(currentScrollPosition);
}

document.querySelector(".leftScroll").addEventListener("click", scrollRight);
document.querySelector(".rightScroll").addEventListener("click", scrollLeft);
