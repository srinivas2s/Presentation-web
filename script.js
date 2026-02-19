document.addEventListener('DOMContentLoaded', () => {
    // Add particle effect to background
    const body = document.body;
    const numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animation = `float ${Math.random() * 10 + 15}s linear infinite`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';

        body.appendChild(particle);
    }

    // Add float animation keyframes dynamically
    if (!document.getElementById('particle-styles')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'particle-styles';
        styleSheet.innerText = `
            @keyframes float {
                0% { transform: translateY(0) translateX(0); opacity: 0; }
                10% { opacity: 0.8; }
                90% { opacity: 0.8; }
                100% { transform: translateY(-110vh) translateX(0); opacity: 0; }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});
