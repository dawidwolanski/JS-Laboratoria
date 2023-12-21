const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const pauseButton = document.querySelector('.pause');

let currentSlide = 0;
let isPaused = false;

function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
}

function showPrevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function showNextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function togglePause() {
    isPaused = !isPaused;
}

prevButton.addEventListener('click', () => {
    showPrevSlide();
    togglePause(); 
});

nextButton.addEventListener('click', () => {
    showNextSlide();
    togglePause(); 
});

pauseButton.addEventListener('click', togglePause);


setInterval(() => {
    if (!isPaused) {
        showNextSlide();
    }
}, 4000);


showSlide(currentSlide);