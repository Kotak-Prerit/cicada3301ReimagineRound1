const menu = document.querySelector('.menu')
const toolbox = document.querySelector('.toolBox')
const cursor = document.querySelector('.cursor')
const hamburger = document.querySelector('.hamburger')
const slider = document.querySelector('.slider-wrapper')
const slider_item = document.querySelector('.slider-item')
const left = document.querySelector('.btn-left')
const right = document.querySelector('.btn-right')
const character_wrapper = document.querySelector('.char-img-wrapper')
const images = document.querySelectorAll('.char-img');
const arrow = document.querySelector('.arrow')

//Menu
menu.addEventListener('click', function () {
    toolbox.classList.toggle("menuActive")
    hamburger.classList.toggle('is-active')
})

//Slider
slider.addEventListener('mousedown', e => {
    slider.dataset.mouseDownAt = e.clientX;
    slider.classList.add('grabbing');
});

slider.addEventListener('mousemove', e => {
    if (slider.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(slider.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 1.5;

    const percentage = (mouseDelta / maxDelta) * -63,
        nextPercentageUnconstrained = parseFloat(slider.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -63);

    slider.dataset.percentage = nextPercentage;

    slider.style.transform = `translate(${nextPercentage}%, -50%)`;


});

slider.addEventListener('mouseup', () => {
    slider.dataset.mouseDownAt = "0";
    slider.dataset.prevPercentage = slider.dataset.percentage;
    slider.classList.remove('grabbing');
});

slider.addEventListener('mouseleave', () => {
    if (slider.classList.contains('grabbing')) {
        slider.dataset.mouseDownAt = "0";
        slider.dataset.prevPercentage = slider.dataset.percentage;
        slider.classList.remove('grabbing');
    }
});

//Carausol
const numImages = images.length;
let translation = 0;

left.addEventListener('click', () => {
    arrow.style.display = "none";
    if (translation < 0) {
      translation += 100;
      character_wrapper.style.transform = `translateX(${translation}%)`;
    }
});
  
right.addEventListener('click', () => {
    arrow.style.display = "none";
    if (translation > -100 * (numImages - 1)) {
      translation -= 100;
      character_wrapper.style.transform = `translateX(${translation}%)`;
    }
});