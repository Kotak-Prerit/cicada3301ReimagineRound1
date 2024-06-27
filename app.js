const menu = document.querySelector('.menu')
const toolbox = document.querySelector('.toolBox')
const cursor = document.querySelector('.cursor')
const hamburger = document.querySelector('.hamburger')

menu.addEventListener('click', function () {
    toolbox.classList.toggle("menuActive")
    hamburger.classList.toggle('is-active')
})

const banner = document.querySelector('.banner')
const slider = document.querySelector('.slider-wrapper'),
    slides = Array.from(document.querySelectorAll('.slider-item'))

let isDragging = false,
    StartPosition = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationId = 0,
    Index = 0

slides.forEach((slide, i) => {

    // Touch events
    slide.addEventListener('touchstart', touchStart(i))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)

    // Mouse events
    slide.addEventListener('mousedown', touchStart(i))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)
})

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

function touchStart(index) {
    return function (event) {
        Index = index
        StartPosition = getPositionX(event)
        console.log(StartPosition);
        isDragging = true;

        animationId = requestAnimationFrame(animation)
        slider.classList.add('grabbing')
    }
}
function touchEnd() {
    cancelAnimationFrame(animationId)
    isDragging = false
    const movedBy = currentTranslate - prevTranslate
    
    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -100 && Index < slides.length - 1) Index += 1
    
    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > 100 && Index > 0) Index -= 1

    setPositionByIndex()
    
    slider.classList.remove('grabbing')
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = event.clientX
        currentTranslate = prevTranslate + currentPosition - StartPosition
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function animation() {
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
    currentTranslate = Index * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
}


// const animateTrailer = (e, interacting) => {
//   const x = e.clientX - cursor.offsetWidth / 2,
//         y = e.clientY - cursor.offsetHeight / 2;
  
//   const keyframes = {
//     transform: `translate(${x}px, ${y}px) scale(${interacting ? 8 : 1})`
//   }
  
//   cursor.animate(keyframes, { 
//     duration: 800, 
//     fill: "forwards" 
//   });
// }

// window.onmousemove = e => {
//     const interactable = e.target.closest(".slider-wrapper"),
//           interacting = interactable !== null;
    
//     animateTrailer(e, interacting);
    
//     cursor.dataset.type = interacting ? interactable.dataset.type : "";
    
//   }