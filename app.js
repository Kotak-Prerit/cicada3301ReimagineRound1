const menu = document.querySelector('.menu')
const toolbox = document.querySelector('.toolBox')
const hamburger = document.querySelector('.hamburger')
const slider = document.querySelector('.slider-wrapper')
const slider_item = document.querySelector('.slider-item')
const left = document.querySelector('.btn-left')
const right = document.querySelector('.btn-right')
const character_wrapper = document.querySelector('.char-img-wrapper')
const images = document.querySelectorAll('.char-img');
const arrow = document.querySelector('.arrow')
const cursor = document.querySelector('.cursor');

//Menu
menu.addEventListener('click', function () {
    toolbox.classList.toggle("menuActive")
    hamburger.classList.toggle('is-active')
})

//Slider Desktop
slider.addEventListener('mousedown', a => {
    slider.dataset.mouseDownAt = a.clientX;
    slider.classList.add('grabbing');
}); 

slider.addEventListener('mousemove', (e) => {
    const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        let isDragging = false;
        
        slider.addEventListener('mousedown', () => {
        isDragging = true;
        });
        
        slider.addEventListener('mouseup', () => {
        isDragging = false;
        });
        
        if (!isDragging) {
            cursor.style.transform = `translate(${x - 50}px, ${y - 20}px)`;
        };
})

slider.addEventListener('mousemove', e => {
    if (slider.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(slider.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 1.5;

    const percentage = (mouseDelta / maxDelta) * -75,
        nextPercentageUnconstrained = parseFloat(slider.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -75);

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

// Slider Mobile
slider.addEventListener('touchstart', e => {
    slider.dataset.mouseDownAt = e.touches[0].clientX;
});

slider.addEventListener('touchmove', e => {
    if (slider.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(slider.dataset.mouseDownAt) - e.touches[0].clientX;
    const maxDelta = window.innerWidth / 1.5;
    const percentage = (mouseDelta / maxDelta) * -75;
    const nextPercentageUnconstrained = parseFloat(slider.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -75);
    slider.dataset.percentage = nextPercentage;
    slider.style.transform = `translate(${nextPercentage}%, -50%)`;
});

slider.addEventListener('touchend', () => {
    slider.dataset.mouseDownAt = "0";
    slider.dataset.prevPercentage = slider.dataset.percentage;
    slider.classList.remove('grabbing');
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