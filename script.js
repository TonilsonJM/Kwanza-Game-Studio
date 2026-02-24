const hamburger = document.getElementById('hamburger');
const header = document.querySelector('.header');
const modal = document.getElementById('contactModal');
const closeBtn = document.querySelector('.close');
const contactLinks = document.querySelectorAll('a[href="#contact"]');
const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.querySelector('.nav-menu');

const THEME_KEY = 'kwanza-theme';

function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
    const current = getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
}

document.body.setAttribute('data-theme', getTheme());

document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
});

/* Add null checks to prevent runtime errors */
if (!hamburger || !header || !modal || !closeBtn || !navMenu) {
    console.error('[v0] Missing required DOM elements');
}

if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        if (navMenu) navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
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

// Project detail modal (Ver Mais)
const projectModal = document.getElementById('projectModal');
const projectModalBody = document.getElementById('projectModalBody');
const closeProjectBtn = document.querySelector('.close-project');

const ilhaDesertaContent = `
    <div class="project-detail" data-project="ilha-deserta">
        <h2 data-pt="Ilha Deserta" data-en="Ilha Deserta">Ilha Deserta</h2>
        <p class="project-detail-label"><strong data-pt="OBJECTIVO" data-en="OBJECTIVE">OBJECTIVO</strong></p>
        <p class="project-detail-text" data-pt="Recolher materiais para construir um barco e fugir da ilha enquanto coleta água e comida para sobreviver." data-en="Gather materials to build a boat and escape the island while collecting water and food to survive.">Recolher materiais para construir um barco e fugir da ilha enquanto coleta água e comida para sobreviver.</p>
        <p class="project-detail-label"><strong data-pt="HISTORIA" data-en="STORY">HISTORIA</strong></p>
        <p class="project-detail-text" data-pt="Em dias de férias Aveliny e amigos saíram para viajar de iate, mas algo inesperado acontece, o iate é invadido por terroristas, então Aveliny avista uma ilha e pula do navio, nada em direção à ilha e consegue sobreviver. Mas agora, como Aveliny vai escapar da ilha? Ela precisa sobreviver até enquanto conserta um barco de madeira para tentar escapar da ilha deserta." data-en="On a holiday, Aveliny and friends went on a yacht trip, but something unexpected happens – the yacht is taken over by terrorists. Aveliny spots an island and jumps off the ship, swims to the island and survives. Now, how will Aveliny escape the island? She must survive while repairing a wooden boat to try to escape the desert island.">Em dias de férias Aveliny e amigos saíram para viajar de iate, mas algo inesperado acontece, o iate é invadido por terroristas, então Aveliny avista uma ilha e pula do navio, nada em direção à ilha e consegue sobreviver. Mas agora, como Aveliny vai escapar da ilha? Ela precisa sobreviver até enquanto conserta um barco de madeira para tentar escapar da ilha deserta.</p>
        <a href="https://tonilsonjm.itch.io/ilha-deserta" target="_blank" rel="noopener noreferrer" class="btn btn-primary project-download-btn" data-pt="Baixar" data-en="Download">Baixar</a>
    </div>
`;

function openProjectModal(projectId) {
    if (!projectModal || !projectModalBody) return;
    if (projectId === 'ilha-deserta') {
        projectModalBody.innerHTML = ilhaDesertaContent;
        projectModalBody.querySelector('.project-download-btn').style.display = '';
    } else {
        const item = document.querySelector(`.case-item[data-project="${projectId}"]`);
        const title = item ? (item.querySelector('h3')?.textContent || '') : '';
        const desc = item ? (item.querySelector('.case-item p')?.textContent || '') : '';
        projectModalBody.innerHTML = `
            <div class="project-detail">
                <h2>${title}</h2>
                <p class="project-detail-text">${desc}</p>
                <p class="project-detail-coming" data-pt="Em breve mais informações." data-en="More information coming soon.">Em breve mais informações.</p>
            </div>
        `;
    }
    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (projectModal) {
        projectModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

document.querySelectorAll('.case-link-detail').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const projectId = this.getAttribute('data-project');
        if (projectId) openProjectModal(projectId);
    });
});

if (closeProjectBtn) {
    closeProjectBtn.addEventListener('click', closeProjectModal);
}

if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeProjectModal();
    });
}

// Smooth scroll for anchor links (exclui .case-link-detail que abre o modal)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.classList.contains('case-link-detail')) return;
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
