const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const pagination = document.querySelector('.pagination');

let currentSlide = 0;
let isPlaying = true;
let interval;

function showSlide(slideIndex) {
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}


function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    updatePagination();
}


function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    updatePagination();
}


function updatePagination() {
    pagination.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            updatePagination();
        });
        if (index === currentSlide) {
            dot.classList.add('active');
        }
        pagination.appendChild(dot);
    });
}


function startSlider() {
    interval = setInterval(() => {
        nextSlide();
    }, 3000);
}


startSlider();


function toggleSlider() {
    if (isPlaying) {
        clearInterval(interval);
    } else {
        startSlider();
    }
    isPlaying = !isPlaying;
}


nextBtn.addEventListener('click', () => {
    nextSlide();
    toggleSlider();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    toggleSlider();
});