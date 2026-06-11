/* ═══════════════════════════════════════════════
   ORIGINAL JS — preserved and fixed
═══════════════════════════════════════════════ */

// Footer year
const ano = new Date().getFullYear();
document.getElementById('footer-copy').innerHTML = `© ${ano} — Todos os direitos reservados a Giovana Kymberli`;

// Função do formulário de contato (renomeada para evitar conflito)
function submitForm(e) {
  e.preventDefault();
  const nome = document.getElementById('formNome').value;
  const telefone = document.getElementById('formTelefone').value;
  const mensagem = document.getElementById('formMensagem').value;
  if (!nome || !telefone || !mensagem) { alert('Preencha todos os campos.'); return; }
  window.location.href = `mailto:kymberli.vana@gmail.com?subject=Contato do Portfólio - ${encodeURIComponent(nome)}&body=Nome: ${encodeURIComponent(nome)}%0ATelefone: ${encodeURIComponent(telefone)}%0AMensagem: ${encodeURIComponent(mensagem)}`;
  alert('Seu cliente de email será aberto. Basta enviar a mensagem para concluir!');
  e.target.reset();
}

function openModal(id) { document.getElementById(id).classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
  if (id === 'modal-revista') destroyFlipbook();
}
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
    closeLightbox();
  }
});

const galleries = {
  socialmedia: {
    tag: 'Social Media',
    title: 'Trabalhos para Redes Sociais',
    images: [
      { src: 'socialmedia/poster.webp', wide: true },
      { src: 'socialmedia/1.webp' },
      { src: 'socialmedia/2.webp' },
      { src: 'socialmedia/3.webp' },
      { src: 'socialmedia/4.webp' },
      { src: 'socialmedia/5.webp' },
      { src: 'socialmedia/6.webp' },
      { src: 'socialmedia/petshop.webp' },
      { src: 'socialmedia/viagem.webp' },
      { src: 'socialmedia/modusad.webp' },
      { src: 'socialmedia/modus.webp' }
    ]
  }
};

function openGallery(key) {
  const data = galleries[key];
  document.getElementById('gallery-tag').textContent = data.tag;
  document.getElementById('gallery-title').textContent = data.title;
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';
  data.images.forEach(img => {
    const el = document.createElement('img');
    el.src = img.src;
    if (img.wide) el.classList.add('wide');
    el.onclick = () => openLightbox(img.src);
    grid.appendChild(el);
  });
  openModal('modal-gallery');
}

function openSalonLine() { openModal('modal-salonline'); }
function openLightbox(src) { document.getElementById('lightbox-img').src = src; document.getElementById('lightbox').classList.add('open'); }
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); document.getElementById('lightbox-img').src = ''; }
document.getElementById('lightbox').addEventListener('click', e => { if (e.target === document.getElementById('lightbox')) closeLightbox(); });

const TOTAL_PAGES = 16;
let flipbookReady = false;

function calcFlipbookSize() {
  const maxW = Math.min(window.innerWidth * 0.85, 900);
  const maxH = window.innerHeight * 0.72;
  let pageW = maxW / 2, pageH = pageW * 1.41;
  if (pageH > maxH) { pageH = maxH; pageW = pageH / 1.41; }
  if (window.innerWidth < 600) { pageW = Math.min(window.innerWidth * 0.82, 320); pageH = pageW * 1.41; }
  return { w: Math.floor(pageW), h: Math.floor(pageH) };
}

function openRevista() {
  openModal('modal-revista');
  setTimeout(initFlipbook, 300);
}

function initFlipbook() {
  if (flipbookReady) return;
  const $fb = $('#flipbook');
  $fb.empty().removeData();
  const { w, h } = calcFlipbookSize();
  const isMobile = window.innerWidth < 600;
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    $fb.append(`<div class="page"><img src="revista/${i}.webp" alt="Página ${i}" loading="lazy"></div>`);
  }
  $fb.turn({
    width: isMobile ? w : w * 2,
    height: h,
    autoCenter: true,
    gradients: true,
    acceleration: true,
    display: isMobile ? 'single' : 'double',
    duration: 600,
    when: { turned: (e, page) => updateCounter(page) }
  });
  document.getElementById('flip-total').textContent = TOTAL_PAGES;
  updateCounter(1);
  flipbookReady = true;
}

function destroyFlipbook() {
  try {
    const $fb = $('#flipbook');
    if ($fb.data('turn')) {
      $fb.turn('stop');
      $(document).off('mousemove.turn mouseup.turn touchmove.turn touchend.turn');
      $fb.turn('destroy');
    }
    $fb.empty();
  } catch(e) {
    try { $('#flipbook').empty(); } catch(e2) {}
  }
  flipbookReady = false;
  updateCounter(1);
}

function flipNext() { if (flipbookReady) $('#flipbook').turn('next'); }
function flipPrev() { if (flipbookReady) $('#flipbook').turn('previous'); }
function updateCounter(page) { document.getElementById('flip-current').textContent = page; }

document.addEventListener('keydown', e => {
  if (!document.getElementById('modal-revista').classList.contains('open')) return;
  if (e.key === 'ArrowRight') flipNext();
  if (e.key === 'ArrowLeft') flipPrev();
});

function openKimbre() { openModal('modal-kimbre'); }

function enableKimbreImageClick() {
  const kimbreImages = document.querySelectorAll('#modal-kimbre .kimbre-step-img img');
  kimbreImages.forEach(img => {
    if (img.getAttribute('data-click-enabled')) return;
    img.setAttribute('data-click-enabled', 'true');
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img.src);
    });
  });
}

const kimbreModal = document.getElementById('modal-kimbre');
const observerKimbre = new MutationObserver(() => {
  if (kimbreModal.classList.contains('open')) enableKimbreImageClick();
});
observerKimbre.observe(kimbreModal, { attributes: true, attributeFilter: ['class'] });
enableKimbreImageClick();

/* ═══════════════════════════════════════════════
   WEBGL — Three.js Particle Background
═══════════════════════════════════════════════ */

(function initWebGL() {
  const isMobile = window.innerWidth < 768;
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('webgl-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.z = 35;

  const COUNT = isMobile ? 60 : 200;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 70;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    const t = Math.random();
    colors[i * 3]     = 0.68 + t * 0.32;
    colors[i * 3 + 1] = 0.48 + t * 0.38;
    colors[i * 3 + 2] = 0.88 + t * 0.12;
    sizes[i] = 0.08 + Math.random() * 0.18;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: isMobile ? 0.35 : 0.55,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let heroVisible = true;

  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, { passive: true });

  let raf;
  const clock = { start: Date.now() };

  function animate() {
    raf = requestAnimationFrame(animate);
    if (!heroVisible) return;

    const elapsed = (Date.now() - clock.start) * 0.0003;
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    particles.rotation.y = elapsed * 0.06 + targetX * 0.04;
    particles.rotation.x = elapsed * 0.03 + targetY * 0.025;

    const pos = geo.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += Math.sin(elapsed + i * 0.5) * 0.002;
    }
    geo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('scroll', () => {
    const heroH = document.getElementById('inicio').offsetHeight;
    heroVisible = window.scrollY < heroH * 1.2;
    canvas.style.opacity = heroVisible ? Math.max(0, 1 - window.scrollY / (heroH * 0.7)) : '0';
  }, { passive: true });
})();

/* ═══════════════════════════════════════════════
   GSAP — Register & Setup
═══════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);



/* NAV HIDE ON SCROLL DOWN */
(function initNav() {
  const nav = document.getElementById('main-nav');
  let lastY = 0;
  gsap.to(nav, { opacity: 0, y: -20, duration: 0 });

  ScrollTrigger.create({
    start: 'top top',
    onUpdate: self => {
      const cur = window.scrollY;
      if (cur < 80) {
        gsap.to(nav, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
      } else if (cur > lastY + 4) {
        gsap.to(nav, { y: -80, opacity: 0, duration: 0.4, ease: 'power2.in' });
      } else if (cur < lastY - 4) {
        gsap.to(nav, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
      }
      lastY = cur;
    }
  });
})();

/* LOADER → HERO ENTRANCE */
(function initLoader() {
  const loaderLine = document.querySelector('.loader-line');
  const loader     = document.getElementById('loader');

  const tl = gsap.timeline({
    onComplete: () => {
      loader.style.pointerEvents = 'none';
      initHeroTimeline();
    }
  });

  tl.to(loaderLine, { scaleX: 1, duration: 1.4, ease: 'power3.inOut' })
    .to('.loader-name', { opacity: 0, y: -24, duration: 0.5, ease: 'power2.in' }, '-=0.25')
    .to('.loader-percent', { opacity: 0, duration: 0.3 }, '<')
    .to(loader, { yPercent: -100, duration: 0.85, ease: 'power3.inOut' }, '+=0.1')
    .set(loader, { display: 'none' });
})();

/* HERO CINEMATIC TIMELINE */
function initHeroTimeline() {
  const nav = document.getElementById('main-nav');
  gsap.to(nav, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });

  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  heroTl
    .fromTo('.hero-photo',
      { opacity: 0, scale: 0.88, filter: 'blur(8px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2 }
    )
    .fromTo('.hero-tag',
      { opacity: 0, y: 22, letterSpacing: '0.5em' },
      { opacity: 1, y: 0,  letterSpacing: '0.2em', duration: 0.7 },
      '-=0.7'
    )
    .fromTo('.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0,  duration: 1 },
      '-=0.5'
    )
    .fromTo('.hero-desc',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0,  duration: 0.7 },
      '-=0.5'
    )
    .fromTo('.hero-socials',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0,  duration: 0.6 },
      '-=0.4'
    )
    .fromTo('.hero-bg-text',
      { opacity: 0, scale: 1.1 },
      { opacity: 1,  scale: 1,  duration: 1.2 },
      '-=1.2'
    )
    .fromTo('.scroll-indicator',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0,  duration: 0.6 },
      '-=0.3'
    )
    .fromTo('.available-badge',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.4'
    );

  /* Marquee */
  const track = document.getElementById('marquee-track');
  if (track) {
    const totalW = track.scrollWidth / 2;
    gsap.fromTo(track,
      { x: 0 },
      { x: -totalW, duration: 28, ease: 'none', repeat: -1, modifiers: { x: gsap.utils.unitize(v => parseFloat(v) % -totalW) } }
    );
  }
}

/* HERO SCROLL PARALLAX */
gsap.to('.hero-bg-text', {
  y: -180,
  ease: 'none',
  scrollTrigger: {
    trigger: '#inicio',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.8
  }
});

gsap.to('.hero-content', {
  y: 130,
  opacity: 0.2,
  ease: 'none',
  scrollTrigger: {
    trigger: '#inicio',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.2
  }
});

gsap.to('.scroll-indicator', {
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '#inicio',
    start: 'top top',
    end: '20% top',
    scrub: true
  }
});

/* SOBRE — clip-path reveal + parallax number */
gsap.from('#sobre', {
  clipPath: 'inset(8% 0 0 0)',
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '#sobre',
    start: 'top 85%',
    end: 'top 30%',
    scrub: 1.5
  }
});

gsap.to('.sobre-number', {
  y: -80,
  ease: 'none',
  scrollTrigger: {
    trigger: '#sobre',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 2
  }
});

/* GENERIC REVEAL (excludes grouped elements handled separately) */
document.querySelectorAll('.reveal').forEach(el => {
  if (el.closest('.edu-list') || el.closest('.skills-grid') || el.closest('.portfolio-grid')) return;

  const delay = el.classList.contains('reveal-delay-4') ? 0.4
              : el.classList.contains('reveal-delay-3') ? 0.3
              : el.classList.contains('reveal-delay-2') ? 0.2
              : el.classList.contains('reveal-delay-1') ? 0.1
              : 0;

  gsap.fromTo(el,
    { opacity: 0, y: 45 },
    {
      opacity: 1,
      y: 0,
      duration: 0.95,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    }
  );
});

/* EDUCATION — stagger + x slide */
gsap.to('.edu-item', {
  opacity: 1,
  x: 0,
  stagger: 0.18,
  duration: 0.85,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.edu-list',
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
});

gsap.from('.edu-item', {
  paddingLeft: 0,
  scrollTrigger: {
    trigger: '.edu-list',
    start: 'top 80%'
  }
});

document.querySelectorAll('.edu-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item, { paddingLeft: '1.2rem', duration: 0.3, ease: 'power2.out' });
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(item, { paddingLeft: '0rem', duration: 0.3, ease: 'power2.out' });
  });
});

/* SKILLS — stagger scale-up */
gsap.to('.skill-group', {
  opacity: 1,
  y: 0,
  stagger: 0.15,
  duration: 0.85,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.skills-grid',
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
});

document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    gsap.to(tag, { scale: 1.07, duration: 0.25, ease: 'power2.out' });
  });
  tag.addEventListener('mouseleave', () => {
    gsap.to(tag, { scale: 1, duration: 0.25, ease: 'power2.out' });
  });
});

/* PORTFOLIO — stagger reveal + GSAP hover */
gsap.to('.project-card', {
  opacity: 1,
  y: 0,
  stagger: 0.14,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.portfolio-grid',
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
});

document.querySelectorAll('.project-card').forEach(card => {
  const img  = card.querySelector('.project-card-cover');
  const meta = card.querySelector('.project-card-meta');
  const btn  = card.querySelector('.project-open-btn');

  card.addEventListener('mouseenter', () => {
    gsap.to(img,  { scale: 1.07, filter: 'brightness(0.42)', duration: 0.65, ease: 'power2.out' });
    gsap.to(meta, { opacity: 1,  duration: 0.4, ease: 'power2.out' });
    if (btn) gsap.from(btn, { y: 14, duration: 0.5, ease: 'power3.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(img,  { scale: 1, filter: 'brightness(0.85)', duration: 0.65, ease: 'power2.out' });
    gsap.to(meta, { opacity: 0, duration: 0.35, ease: 'power2.in' });
  });
});

/* BTN HOVER */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { scale: 1.03, y: -2, boxShadow: '0 14px 32px rgba(200,162,255,.38)', duration: 0.3, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { scale: 1, y: 0, boxShadow: '0 0px 0px rgba(200,162,255,0)', duration: 0.3, ease: 'power2.out' });
  });
});

/* AVAILABLE BADGE FLOAT */
gsap.to('.available-badge', {
  y: -6,
  duration: 2.2,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1
});

/* CONTATO section parallax heading */
gsap.from('.contact-heading', {
  x: -40,
  opacity: 0,
  duration: 1.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '#contato',
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
});

/* FOOTER reveal */
gsap.from('footer', {
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: 'footer',
    start: 'top 90%',
    toggleActions: 'play none none none'
  }
});

/* SCROLL PROGRESS LINE */
(function initProgressLine() {
  const line = document.createElement('div');
  line.style.cssText = 'position:fixed;top:0;left:0;height:1px;background:linear-gradient(to right,var(--lilac-dark),var(--lilac));z-index:9990;width:0%;pointer-events:none;transform-origin:left center;';
  document.body.appendChild(line);

  ScrollTrigger.create({
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: self => { line.style.width = (self.progress * 100) + '%'; }
  });
})();

/* MOBILE: disable heavy effects */
if (window.innerWidth <= 768) {
  ScrollTrigger.getAll().forEach(st => {
    if (st.vars && st.vars.scrub) st.kill();
  });
}
