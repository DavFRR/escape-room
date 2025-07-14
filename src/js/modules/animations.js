/**
 * Animations module for handling transitions and interactions
 */

// Animation configuration
const config = {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    intersectionThreshold: 0.1,
    intersectionMargin: '50px'
};

// Utility function for creating smooth animations
const animate = (element, keyframes, options) => {
    return element.animate(keyframes, {
        duration: config.duration,
        easing: config.easing,
        fill: 'forwards',
        ...options
    });
};

// Setup scroll-triggered animations
const setupScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animate;

                    switch (animation) {
                        case 'fade-up':
                            animate(element, [
                                { opacity: 0, transform: 'translateY(20px)' },
                                { opacity: 1, transform: 'translateY(0)' }
                            ]);
                            break;

                        case 'fade-in':
                            animate(element, [
                                { opacity: 0 },
                                { opacity: 1 }
                            ]);
                            break;

                        case 'scale-in':
                            animate(element, [
                                { opacity: 0, transform: 'scale(0.95)' },
                                { opacity: 1, transform: 'scale(1)' }
                            ]);
                            break;
                    }

                    observer.unobserve(element);
                }
            });
        },
        {
            threshold: config.intersectionThreshold,
            rootMargin: config.intersectionMargin
        }
    );

    animatedElements.forEach(element => observer.observe(element));
};

// Setup hover animations
const setupHoverAnimations = () => {
    const hoverElements = document.querySelectorAll('[data-hover]');

    hoverElements.forEach(element => {
        const animation = element.dataset.hover;

        element.addEventListener('mouseenter', () => {
            switch (animation) {
                case 'scale':
                    animate(element, [
                        { transform: 'scale(1)' },
                        { transform: 'scale(1.05)' }
                    ]);
                    break;

                case 'lift':
                    animate(element, [
                        { transform: 'translateY(0)' },
                        { transform: 'translateY(-5px)' }
                    ]);
                    break;

                case 'glow':
                    animate(element, [
                        { boxShadow: 'none' },
                        { boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }
                    ]);
                    break;
            }
        });

        element.addEventListener('mouseleave', () => {
            switch (animation) {
                case 'scale':
                    animate(element, [
                        { transform: 'scale(1.05)' },
                        { transform: 'scale(1)' }
                    ]);
                    break;

                case 'lift':
                    animate(element, [
                        { transform: 'translateY(-5px)' },
                        { transform: 'translateY(0)' }
                    ]);
                    break;

                case 'glow':
                    animate(element, [
                        { boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' },
                        { boxShadow: 'none' }
                    ]);
                    break;
            }
        });
    });
};

// Setup click animations
const setupClickAnimations = () => {
    const clickElements = document.querySelectorAll('[data-click]');

    clickElements.forEach(element => {
        element.addEventListener('click', () => {
            const animation = element.dataset.click;

            switch (animation) {
                case 'ripple':
                    const ripple = document.createElement('span');
                    ripple.className = 'ripple';
                    element.appendChild(ripple);

                    const rect = element.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    ripple.style.width = ripple.style.height = `${size}px`;

                    animate(ripple, [
                        { transform: 'scale(0)', opacity: 1 },
                        { transform: 'scale(4)', opacity: 0 }
                    ], {
                        duration: 600
                    }).onfinish = () => ripple.remove();
                    break;

                case 'pulse':
                    animate(element, [
                        { transform: 'scale(1)' },
                        { transform: 'scale(0.95)' },
                        { transform: 'scale(1)' }
                    ], {
                        duration: 200
                    });
                    break;
            }
        });
    });
};

// Setup page transition animations
const setupPageTransitions = () => {
    document.querySelectorAll('a[data-transition]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.target !== '_blank' && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
                e.preventDefault();
                const href = link.href;

                // Fade out current page
                animate(document.body, [
                    { opacity: 1 },
                    { opacity: 0 }
                ], {
                    duration: 200
                }).onfinish = () => {
                    window.location.href = href;
                };
            }
        });
    });

    // Fade in new page
    if (document.body.dataset.pageTransition !== 'false') {
        animate(document.body, [
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 200
        });
    }
};

// Export animation setup function
export const setupAnimations = () => {
    setupScrollAnimations();
    setupHoverAnimations();
    setupClickAnimations();
    setupPageTransitions();

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform-origin: center;
            pointer-events: none;
        }

        [data-animate] {
            opacity: 0;
        }

        [data-animate].visible {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
};