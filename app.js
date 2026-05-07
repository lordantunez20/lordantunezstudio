// ============================================================
// PUBLIC SITE APP
// ============================================================

const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/lordantunez12@gmail.com';
let staticFallbackTimer = null;

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function showStaticPage() {
    document.getElementById('preloader')?.remove();
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .hero-title .line span, .preloader-text span').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

function initRevealAnimations(root = document) {
    const targets = [
        { selector: '.reveal', vars: { y: 0 } },
        { selector: '.reveal-left', vars: { x: 0 } },
        { selector: '.reveal-right', vars: { x: 0 } },
        { selector: '.reveal-scale', vars: { scale: 1 } }
    ];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
        root.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }
    targets.forEach(({ selector, vars }) => {
        root.querySelectorAll(selector).forEach(el => {
            if (el.dataset.revealBound) return;
            el.dataset.revealBound = 'true';
            gsap.to(el, {
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                ...vars
            });
        });
    });
    ScrollTrigger.refresh();
}

// ============================================================
// RENDER FUNCTIONS
// ============================================================

async function renderPortfolio() {
    const projects = await AppDB.getAllFromStore('projects');
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    grid.innerHTML = projects.map(item => {
        const id = SiteUtils.normalizeId(item.id) || 0;
        return `
        <div class="portfolio-item reveal" onclick="openModal(${id})">
            <img src="${SiteUtils.escapeHTML(SiteUtils.safeUrl(item.image))}" alt="${SiteUtils.escapeHTML(item.title)}" loading="lazy">
            <div class="portfolio-overlay">
                <span class="portfolio-tag">${SiteUtils.escapeHTML(item.tag)}</span>
                <h3 class="portfolio-title">${SiteUtils.escapeHTML(item.title)}</h3>
                <p class="text-white/60 text-sm mt-2 opacity-0 translate-y-4 transition-all duration-500 delay-200 portfolio-desc">${SiteUtils.escapeHTML(item.desc)}</p>
            </div>
        </div>
        `;
    }).join('');

    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const desc = item.querySelector('.portfolio-desc');
            if (desc) {
                desc.style.opacity = '1';
                desc.style.transform = 'translateY(0)';
            }
        });
        item.addEventListener('mouseleave', () => {
            const desc = item.querySelector('.portfolio-desc');
            if (desc) {
                desc.style.opacity = '0';
                desc.style.transform = 'translateY(16px)';
            }
        });
    });

    const heroStat = document.getElementById('heroStatProjects');
    const adminStat = document.getElementById('adminStatProjects');
    if (heroStat) heroStat.textContent = projects.length + '+';
    if (adminStat) adminStat.textContent = projects.length;
    initRevealAnimations(grid);
}

async function renderServices() {
    const services = await AppDB.getAllFromStore('services');
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    const colorMap = {
        cyan: { bg: 'bg-brand-cyan/10', text: 'text-brand-cyan' },
        magenta: { bg: 'bg-brand-magenta/10', text: 'text-brand-magenta' },
        yellow: { bg: 'bg-brand-yellow/10', text: 'text-brand-yellow' }
    };

    grid.innerHTML = services.map(item => {
        const c = colorMap[item.color] || colorMap.cyan;
        return `
        <div class="service-card reveal">
            <div class="service-icon ${c.bg} ${c.text}"><i class="${SiteUtils.escapeHTML(SiteUtils.safeIconClass(item.icon))}"></i></div>
            <h3 class="font-display font-bold text-xl mb-3">${SiteUtils.escapeHTML(item.title)}</h3>
            <p class="text-white/50 text-sm leading-relaxed mb-4">${SiteUtils.escapeHTML(item.desc)}</p>
            <div class="flex flex-wrap gap-2">
                ${item.tags.map(t => `<span class="px-3 py-1 text-[10px] uppercase tracking-wider bg-white/5 rounded-full text-white/50">${SiteUtils.escapeHTML(t)}</span>`).join('')}
            </div>
        </div>
        `;
    }).join('');

    const stat = document.getElementById('adminStatServices');
    if (stat) stat.textContent = services.length;
    initRevealAnimations(grid);
}

async function renderTestimonials() {
    const testimonials = await AppDB.getAllFromStore('testimonials');
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;

    grid.innerHTML = testimonials.map(item => `
        <div class="testimonial-card reveal">
            <div class="quote-icon">&ldquo;</div>
            <p class="text-white/70 leading-relaxed mb-6">${SiteUtils.escapeHTML(item.text)}</p>
            <div class="flex items-center gap-3">
                <img src="${SiteUtils.escapeHTML(SiteUtils.safeUrl(item.photo))}" alt="${SiteUtils.escapeHTML(item.name)}" class="w-12 h-12 rounded-full object-cover">
                <div><div class="font-display font-bold text-white">${SiteUtils.escapeHTML(item.name)}</div><div class="text-white/40 text-sm">${SiteUtils.escapeHTML(item.role)}</div></div>
            </div>
        </div>
    `).join('');

    const stat = document.getElementById('adminStatTestimonials');
    if (stat) stat.textContent = testimonials.length;
    initRevealAnimations(grid);
}

async function renderPublicSite() {
    await Promise.all([
        renderPortfolio(),
        renderServices(),
        renderTestimonials()
    ]);
}

// ============================================================
// MODAL
// ============================================================

async function openModal(id) {
    const projects = await AppDB.getAllFromStore('projects');
    const data = projects.find(p => p.id === id);
    if (!data) return;

    const modal = document.getElementById('portfolioModal');
    const modalImage = document.getElementById('modalImage');
    if (!modal || !modalImage) return;

    modalImage.src = SiteUtils.safeUrl(data.image);
    modalImage.alt = data.title;
    document.getElementById('modalTag').textContent = data.tag;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.descLong || data.desc;
    document.getElementById('modalTags').innerHTML = data.tags
        .map(t => `<span class="px-3 py-1 text-[10px] uppercase tracking-wider bg-white/5 rounded-full text-white/50">${SiteUtils.escapeHTML(t)}</span>`)
        .join('');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close')?.focus();
}

function closeModal() {
    const modal = document.getElementById('portfolioModal');
    modal?.classList.remove('active');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

// ============================================================
// MOBILE MENU
// ============================================================

function setMobileMenu(open) {
    const menu = document.getElementById('mobileMenu');
    const button = document.getElementById('menuBtn');
    if (!menu) return;

    menu.classList.toggle('active', open);
    menu.setAttribute('aria-hidden', String(!open));
    button?.setAttribute('aria-expanded', String(open));
    button?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', open);
}

function toggleMobileMenu() {
    setMobileMenu(!document.getElementById('mobileMenu')?.classList.contains('active'));
}

function closeMobileMenu() {
    setMobileMenu(false);
}

// ============================================================
// INTERACTIONS
// ============================================================

function initCustomCursor() {
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    if (window.matchMedia('(pointer: fine)').matches && window.gsap && cursorDot && cursorOutline) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.05 });
            gsap.to(cursorOutline, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
        });
        document.addEventListener('pointerover', (e) => {
            if (e.target.closest('a, button, .portfolio-item, .service-card, .testimonial-card, .admin-input')) {
                cursorOutline.classList.add('hover');
            }
        });
        document.addEventListener('pointerout', (e) => {
            if (e.target.closest('a, button, .portfolio-item, .service-card, .testimonial-card, .admin-input')) {
                cursorOutline.classList.remove('hover');
            }
        });
        document.addEventListener('mousedown', () => cursorOutline.classList.add('click'));
        document.addEventListener('mouseup', () => cursorOutline.classList.remove('click'));
    } else {
        document.body.style.cursor = 'auto';
        cursorDot?.remove();
        cursorOutline?.remove();
    }
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            e.preventDefault();
            if (!href || href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const target = document.getElementById(decodeURIComponent(href.slice(1)));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initKeyboardHandlers() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeAdminLogin();
            closeAdminPanel();
            closeMobileMenu();
        }
    });
}

function initHeroParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorPalette = [new THREE.Color(0x00f0ff), new THREE.Color(0xff00a0), new THREE.Color(0xffffff)];

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        const data = {
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim().toLowerCase(),
            message: document.getElementById('contactMessage').value.trim(),
            date: new Date().toISOString(),
            _subject: 'Nuevo mensaje desde Lord Antunez Studio',
            _template: 'table',
            _captcha: 'false'
        };

        if (!data.name || !data.email || !data.message) {
            showToast('Completa todos los campos antes de enviar');
            return;
        }

        document.getElementById('contactDate').value = data.date;

        try {
            if (submitButton) submitButton.disabled = true;
            showToast('Enviando mensaje...');

            const response = await fetch(CONTACT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('No se pudo enviar el mensaje');
            }

            try {
                await AppDB.addToStore('messages', {
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    date: data.date
                });
                await window.AdminRender?.renderAdminMessages?.();
                await window.AdminRender?.updateDbPreview?.();
            } catch (dbError) {
                console.warn('El correo se envió, pero no se pudo guardar en Supabase.', dbError);
            }

            form.reset();
            showToast('Mensaje enviado correctamente');
        } catch (error) {
            console.error(error);
            showToast('No se pudo enviar. Intenta de nuevo en unos minutos');
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}

async function initPreloaderAnimation() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!window.gsap || reduceMotion) {
        showStaticPage();
        return;
    }

    clearTimeout(staticFallbackTimer);
    const tl = gsap.timeline({
        onComplete: () => document.getElementById('preloader')?.remove()
    });
    tl.to('#preloaderBar', { width: '100%', duration: 1.2, ease: 'power2.inOut' })
        .to('.preloader-text span', { y: '0%', duration: 0.7, stagger: 0.05, ease: 'power4.out' }, '-=0.8')
        .to('#preloader', { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })
        .from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .to('.hero-title .line span', { y: '0%', duration: 1.1, stagger: 0.1, ease: 'power4.out' }, '-=0.5')
        .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8')
        .from('.hero-buttons', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-stats > div', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4');
}

async function initApp() {
    try {
        if (window.gsap && window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        staticFallbackTimer = setTimeout(showStaticPage, 4500);
        initCustomCursor();
        initNavbarScroll();
        initSmoothScroll();
        initKeyboardHandlers();
        initHeroParticles();
        initContactForm();

        await AppDB.initDB();
        await AppDB.populateDefaultsIfEmpty();
        window.AdminRender?.updateDatabaseStatus?.();
        await renderPublicSite();
        initRevealAnimations();
        await initPreloaderAnimation();
    } catch (error) {
        console.error(error);
        showStaticPage();
        showToast('No se pudo iniciar la base de datos');
    }
}

document.addEventListener('DOMContentLoaded', initApp);

window.AppRender = {
    renderPortfolio,
    renderServices,
    renderTestimonials,
    renderPublicSite
};

Object.assign(window, {
    showToast,
    initRevealAnimations,
    openModal,
    closeModal,
    toggleMobileMenu,
    closeMobileMenu
});
