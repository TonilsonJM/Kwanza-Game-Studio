// Hero slideshow automático
const slides = document.querySelectorAll('.hero-slider img');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

clearInterval(window.heroInterval);
window.heroInterval = setInterval(nextSlide, 7000); // Troca a cada 7 segundos

// Efeito de revelação nos cards de projeto
const gameCards = document.querySelectorAll('.game-card');

gameCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('hovered');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('hovered');
  });
});

// Scroll suave para navegação
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach((btn) => {
  btn.addEventListener('click', function() {
    const item = this.parentElement;
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach((el) => {
      if (el !== item) el.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});

// Carrossel de Jogos - rolagem infinita suave
const carousel = document.getElementById('games-carousel');
const btnLeft = document.getElementById('carousel-left');
const btnRight = document.getElementById('carousel-right');

function scrollCarousel(direction) {
  const card = carousel.querySelector('.game-card');
  if (!card) return;
  const scrollAmount = card.offsetWidth + 30; // gap
  if (direction === 'left') {
    // Clona o último e coloca no início, ajusta scroll, depois anima
    const last = carousel.lastElementChild.cloneNode(true);
    carousel.insertBefore(last, carousel.firstElementChild);
    carousel.scrollLeft += scrollAmount;
    setTimeout(() => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setTimeout(() => {
        carousel.removeChild(carousel.lastElementChild);
      }, 400);
    }, 10);
  } else {
    // Anima para a direita, depois move o primeiro para o fim
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(() => {
      const first = carousel.firstElementChild.cloneNode(true);
      carousel.appendChild(first);
      carousel.removeChild(carousel.firstElementChild);
      carousel.scrollLeft -= scrollAmount;
    }, 400);
  }
}
if (btnLeft && btnRight && carousel) {
  btnLeft.addEventListener('click', () => scrollCarousel('left'));
  btnRight.addEventListener('click', () => scrollCarousel('right'));
}

// Ajustar botão Saber Mais para rolar até o FAQ
const saberMaisBtn = document.querySelector('.hero-text .btn');
if (saberMaisBtn) {
  saberMaisBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const faq = document.getElementById('faq');
    if (faq) faq.scrollIntoView({ behavior: 'smooth' });
  });
}

// Menu Hamburguer Responsivo
const hamburger = document.getElementById('hamburger-menu');
const navList = document.getElementById('nav-list');
if (hamburger && navList) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
  });
  // Fecha o menu ao clicar em um item
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navList.classList.remove('active');
    });
  });
}
