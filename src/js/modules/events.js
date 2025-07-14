/**
 * Events module for handling global event listeners and user interactions
 */

// Event handler configuration
const config = {
    scrollThrottle: 100,
    resizeThrottle: 250,
    scrollOffset: 100
};

// Utility function for throttling event handlers
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Handle scroll events
const handleScroll = throttle(() => {
    const scrollPosition = window.scrollY;

    // Toggle header class on scroll
    const header = document.querySelector('.header');
    if (header) {
        if (scrollPosition > config.scrollOffset) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    // Show/hide scroll-to-top button
    const scrollTopButton = document.querySelector('.scroll-top');
    if (scrollTopButton) {
        if (scrollPosition > window.innerHeight) {
            scrollTopButton.classList.add('scroll-top--visible');
        } else {
            scrollTopButton.classList.remove('scroll-top--visible');
        }
    }

    // Update active navigation state
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`.nav__link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav__link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}, config.scrollThrottle);

// Handle resize events
const handleResize = throttle(() => {
    // Update any responsive elements
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

    // Recalculate any position-dependent elements
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.minHeight = `${window.innerHeight}px`;
    }
}, config.resizeThrottle);

// Handle keyboard navigation
const handleKeyboard = (event) => {
    // Handle tab navigation
    if (event.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }

    // Handle escape key
    if (event.key === 'Escape') {
        // Close any open modals
        const openModals = document.querySelectorAll('.modal--visible');
        openModals.forEach(modal => {
            modal.dispatchEvent(new CustomEvent('modal:close'));
        });

        // Close any open dropdowns
        const openDropdowns = document.querySelectorAll('.dropdown--open');
        openDropdowns.forEach(dropdown => {
            dropdown.classList.remove('dropdown--open');
        });
    }
};

// Handle mouse navigation
const handleMouseDown = () => {
    document.body.classList.remove('user-is-tabbing');
};

// Create scroll-to-top button
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.className = 'scroll-top';
    button.setAttribute('aria-label', 'Scroll to top');
    button.innerHTML = '↑';

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(button);
};

// Handle smooth scrolling for anchor links
const handleAnchorLinks = () => {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without scrolling
                window.history.pushState(null, '', targetId);
            }
        });
    });
};

// Handle form submissions
const handleForms = () => {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = form.querySelector('[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.classList.add('loading');
            }

            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                // Example API call - replace with actual endpoint
                const response = await fetch('/api/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) throw new Error('Submission failed');

                // Show success message
                form.reset();
                form.classList.add('form--success');
            } catch (error) {
                console.error('Form submission error:', error);
                form.classList.add('form--error');
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.classList.remove('loading');
                }
            }
        });
    });
};

// Export event setup function
export const setupEventListeners = () => {
    // Global event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeyboard);
    document.addEventListener('mousedown', handleMouseDown);

    // Initialize components
    createScrollTopButton();
    handleAnchorLinks();
    handleForms();

    // Initial calls
    handleResize();
    handleScroll();

    // Add CSS for interactive elements
    const style = document.createElement('style');
    style.textContent = `
        .user-is-tabbing *:focus {
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
        }

        .scroll-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--color-primary);
            color: white;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            opacity: 0;
            transform: translateY(1rem);
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .scroll-top--visible {
            opacity: 1;
            transform: translateY(0);
        }

        .scroll-top:hover {
            background: var(--color-primary-dark);
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
};