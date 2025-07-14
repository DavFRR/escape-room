/**
 * Navigation module for handling responsive menu functionality
 */

export const initNavigation = (state, setState) => {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle menu function
    const toggleMenu = () => {
        setState({ isNavOpen: !state.isNavOpen });
        navToggle.classList.toggle('active');
        
        // Handle accessibility
        navToggle.setAttribute('aria-expanded', state.isNavOpen);
        if (state.isNavOpen) {
            navMenu.setAttribute('aria-hidden', 'false');
            navToggle.focus();
        } else {
            navMenu.setAttribute('aria-hidden', 'true');
        }
    };

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
        if (state.isNavOpen && 
            !navMenu.contains(event.target) && 
            !navToggle.contains(event.target)) {
            setState({ isNavOpen: false });
            navToggle.classList.remove('active');
        }
    };

    // Handle keyboard navigation
    const handleKeyboard = (event) => {
        if (event.key === 'Escape' && state.isNavOpen) {
            toggleMenu();
        }

        if (event.key === 'Tab' && state.isNavOpen) {
            // Keep focus within the menu
            const focusableElements = navMenu.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    event.preventDefault();
                }
            }
        }
    };

    // Smooth scroll to sections
    const handleNavLinkClick = (event) => {
        const link = event.currentTarget;
        const targetId = link.getAttribute('href');
        
        if (targetId.startsWith('#') && targetId.length > 1) {
            event.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu after clicking
                if (state.isNavOpen) {
                    toggleMenu();
                }

                // Update URL without scrolling
                window.history.pushState(null, '', targetId);
            }
        }
    };

    // Handle scroll events for sticky navigation
    const handleScroll = () => {
        const header = document.querySelector('.header');
        const scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    };

    // Initialize event listeners
    const initEventListeners = () => {
        navToggle.addEventListener('click', toggleMenu);
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyboard);
        window.addEventListener('scroll', handleScroll, { passive: true });

        navLinks.forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });

        // Handle resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768 && state.isNavOpen) {
                    setState({ isNavOpen: false });
                    navToggle.classList.remove('active');
                }
            }, 250);
        });
    };

    // Set initial ARIA attributes
    const initAccessibility = () => {
        navToggle.setAttribute('aria-controls', 'nav-menu');
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('id', 'nav-menu');
        navMenu.setAttribute('aria-hidden', 'true');
    };

    // Initialize navigation
    initEventListeners();
    initAccessibility();
};