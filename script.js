const hamburger = document.getElementById('hamburger');
const header = document.querySelector('.header');
const modal = document.getElementById('contactModal');
const closeBtn = document.querySelector('.close');
const contactLinks = document.querySelectorAll('a[href="#contact"]');
const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.querySelector('.nav-menu');

/* Add null checks to prevent runtime errors */
if (!hamburger || !header || !modal || !closeBtn || !navMenu) {
    console.error('[v0] Missing required DOM elements');
}

if (hamburger) {
    const navLinksContainer = document.querySelector('.nav-links');
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        // toggle nav menu container (se existir)
        if (navMenu) navMenu.classList.toggle('active');
        // toggle links container também — protege contra regras CSS que escondem .nav-links diretamente
        if (navLinksContainer) navLinksContainer.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        const navLinksContainer = document.querySelector('.nav-links');
        if (navLinksContainer) navLinksContainer.classList.remove('active');
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Contact modal
contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Form submission
/* Add null check for contactForm */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! We will get back to you soon.');
        contactForm.reset();
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#contact') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-item, .blog-item, .case-item, .why-item, .company-badge').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Troca de idioma PT/EN
const langBtns = document.querySelectorAll('.lang-btn');
langBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = btn.textContent.trim().toLowerCase();
        document.querySelectorAll('[data-pt], [data-en]').forEach(el => {
            if (lang === 'pt') {
                if (el.dataset.pt) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = el.dataset.pt;
                    } else {
                        el.innerHTML = el.dataset.pt;
                    }
                }
            } else {
                if (el.dataset.en) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = el.dataset.en;
                    } else {
                        el.innerHTML = el.dataset.en;
                    }
                }
            }
        });
    });
});
