document.addEventListener('DOMContentLoaded', () => {
    // 1. Particle System (Golden Dust)
    const container = document.body;
    const createParticle = () => {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: rgba(212, 175, 55, ${Math.random() * 0.4 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            pointer-events: none;
            z-index: -1;
            filter: blur(1px);
        `;
        container.appendChild(p);

        const duration = Math.random() * 20000 + 10000;
        const animation = p.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 0 },
            { opacity: 1, offset: 0.1 },
            { transform: `translate(${Math.random() * 100 - 50}px, -100px) scale(1.5)`, opacity: 0.8, offset: 0.9 },
            { transform: `translate(${Math.random() * 100 - 50}px, -200px) scale(0)`, opacity: 0 }
        ], {
            duration: duration,
            iterations: Infinity
        });
    };

    for (let i = 0; i < 40; i++) createParticle();

    // 2. Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal');
    const scrollHandler = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    // The container is the one scrolling, not the body
    const portal = document.getElementById('app-portal');
    const observer = new IntersectionObserver(scrollHandler, {
        root: portal,
        threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));

    // 3. 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('.premium-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
        });
    });

    // 4. Parallax Orbs based on Mouse movement
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;

        document.querySelector('.orb-1').style.transform = `translate(${x}px, ${y}px)`;
        document.querySelector('.orb-2').style.transform = `translate(${-x}px, ${-y}px)`;
    });
});
