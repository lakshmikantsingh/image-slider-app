const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const counter = document.querySelector('.counter');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let current = 0;
let timer = null;
const interval = 3000; // ms

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
    dotsContainer.children[i].classList.toggle('active', i === idx);
  });
  counter.textContent = `${idx + 1} / ${slides.length}`;
  current = idx;
}

function nextSlide() {
  showSlide((current + 1) % slides.length);
}
function prevSlide() {
  showSlide((current - 1 + slides.length) % slides.length);
}

// Dots
dotsContainer.innerHTML = '';
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => showSlide(i));
  dotsContainer.appendChild(dot);
});
showSlide(0);

// Auto-play
function startAutoPlay() {
  timer = setInterval(nextSlide, interval);
}
function stopAutoPlay() {
  clearInterval(timer);
}
startAutoPlay();

document.getElementById('slider').addEventListener('mouseenter', stopAutoPlay);
document.getElementById('slider').addEventListener('mouseleave', startAutoPlay);

nextBtn.onclick = nextSlide;
prevBtn.onclick = prevSlide;

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});