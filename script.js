document.addEventListener('DOMContentLoaded', () => {
    // Add particle effect to background
    const body = document.body;
    const numberOfParticles = 60;
    const container = document.querySelector('.container');

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'gold-particle';
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;

        const colors = ['rgba(212, 175, 55, 0.4)', 'rgba(255, 215, 0, 0.3)', 'rgba(153, 101, 21, 0.2)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animation = `float ${Math.random() * 15 + 20}s linear infinite`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';

        body.appendChild(particle);
    }

    // 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('.feature-card, .team-card, .list-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
        });
    });

    // Enhanced Scroll Reveal
    const revealOptions = {
        threshold: 0.1,
        root: container
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateX(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealItems = document.querySelectorAll('section, .cta-container');
    revealItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) rotateX(-10deg)';
        item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(item);
    });

    // Dynamic particle styles
    if (!document.getElementById('particle-styles')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'particle-styles';
        styleSheet.innerText = `
            @keyframes float {
                0% { transform: translateY(0) rotate(0deg); }
                100% { transform: translateY(-100vh) rotate(360deg); }
            }
            .gold-particle {
                box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
            }
        `;
        document.head.appendChild(styleSheet);
    }
});
