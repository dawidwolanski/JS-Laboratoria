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
    togglePause(); // Pauza po zmianie slajdu
});

nextButton.addEventListener('click', () => {
    showNextSlide();
    togglePause(); // Pauza po zmianie slajdu
});

pauseButton.addEventListener('click', togglePause);

// Automatyczne przewijanie slajdów co 4 sekundy
setInterval(() => {
    if (!isPaused) {
        showNextSlide();
    }
}, 4000);

// Wywołanie funkcji showSlide dla pierwszego slajdu na starcie
showSlide(currentSlide);