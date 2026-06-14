// ==================== LOADER ====================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const loaderLine = document.querySelector('.loader-line');
    const loaderPercent = document.querySelector('.loader-percent');
    
    gsap.to(loaderLine, {
        scaleX: 1,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: function() {
            const progress = Math.round(this.progress() * 100);
            loaderPercent.textContent = `${progress}%`;
        }
    });
    
    setTimeout(() => {
        gsap.to(loader, {
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                loader.style.display = 'none';
                document.body.style.overflow = 'auto';
                initAnimations();
            }
        });
    }, 1900);
});

// ==================== MARQUEE INFINITO ====================
function initMarquee() {
    const track = document.getElementById('marquee-track');
    if (!track) return;
    const items = track.innerHTML;
    track.innerHTML = items + items;
    
    gsap.to(track, {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: "none",
        modifiers: {
            xPercent: gsap.utils.unitize(x => parseFloat(x) % 100)
        }
    });
}

// ==================== ANIMAÇÕES SCROLL ====================
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        gsap.fromTo(el, 
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    gsap.utils.toArray('.edu-item').forEach((item, i) => {
        gsap.fromTo(item,
            { x: -40, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    gsap.utils.toArray('.skill-group').forEach((group, i) => {
        gsap.fromTo(group,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: group,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    gsap.utils.toArray('.pcard').forEach((card, i) => {
        gsap.fromTo(card,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: i * 0.08,
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Hero animations
    const heroTag = document.querySelector('.hero-tag');
    const heroTitle = document.querySelector('.hero-title');
    const heroDesc = document.querySelector('.hero-desc');
    const heroSocials = document.querySelector('.hero-socials');
    const heroPhoto = document.querySelector('.hero-photo');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (heroTag) gsap.to(heroTag, { opacity: 1, duration: 0.8, delay: 0.2 });
    if (heroTitle) gsap.to(heroTitle, { opacity: 1, duration: 0.8, delay: 0.4 });
    if (heroDesc) gsap.to(heroDesc, { opacity: 1, duration: 0.8, delay: 0.6 });
    if (heroSocials) gsap.to(heroSocials, { opacity: 1, duration: 0.8, delay: 0.8 });
    if (heroPhoto) gsap.to(heroPhoto, { opacity: 1, duration: 0.8, delay: 0.3, scale: 1, ease: "back.out(0.6)" });
    if (scrollIndicator) gsap.to(scrollIndicator, { opacity: 1, duration: 0.8, delay: 1.2 });
}

// ==================== NAVBAR HIDE ON SCROLL ====================
let lastScroll = 0;
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    if (!nav) return;
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 150) {
        nav.classList.add('nav-hidden');
    } else {
        nav.classList.remove('nav-hidden');
    }
    lastScroll = currentScroll;
});

// ==================== LIGHTBOX ====================
let currentImages = [];
let currentIndex = 0;

function openLightboxInline(imgElement, gridId) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;
    
    if (gridId) {
        const container = document.getElementById(gridId);
        if (container) {
            const imgs = container.querySelectorAll('img');
            currentImages = Array.from(imgs).map(img => img.src);
            const clickedSrc = imgElement.src;
            currentIndex = currentImages.findIndex(src => src === clickedSrc);
        } else {
            currentImages = [imgElement.src];
            currentIndex = 0;
        }
    } else {
        currentImages = [imgElement.src];
        currentIndex = 0;
    }
    
    lightboxImg.src = currentImages[currentIndex];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function nextLightboxImage() {
    if (currentImages.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) lightboxImg.src = currentImages[currentIndex];
}

function prevLightboxImage() {
    if (currentImages.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) lightboxImg.src = currentImages[currentIndex];
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'ArrowLeft') prevLightboxImage();
});

// ==================== SCROLL TO GALLERY & PORTFOLIO ====================
function scrollToGallery(galleryId) {
    const element = document.getElementById(galleryId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToPortfolio() {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ==================== FORM SUBMIT ====================
function submitForm(event) {
    event.preventDefault();
    
    const nome = document.getElementById('formNome')?.value.trim();
    const telefone = document.getElementById('formTelefone')?.value.trim();
    const mensagem = document.getElementById('formMensagem')?.value.trim();
    
    if (!nome || !telefone || !mensagem) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    console.log('Form submitted:', { nome, telefone, mensagem });
    alert(`Obrigada, ${nome}! Sua mensagem foi enviada com sucesso. Em breve entrarei em contato.`);
    
    document.getElementById('formNome').value = '';
    document.getElementById('formTelefone').value = '';
    document.getElementById('formMensagem').value = '';
}

// ==================== COPYRIGHT YEAR ====================
function updateCopyright() {
    const footerCopy = document.getElementById('footer-copy');
    if (footerCopy) {
        footerCopy.innerHTML = `&copy; ${new Date().getFullYear()} Giovana Kymberli — Todos os direitos reservados.`;
    }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    initMarquee();
    updateCopyright();
    document.body.style.overflow = 'hidden';
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
