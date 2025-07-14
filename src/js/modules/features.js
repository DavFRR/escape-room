/**
 * Features module for handling feature cards functionality
 */

class FeatureCard {
    constructor(feature) {
        this.id = feature.id;
        this.title = feature.title;
        this.description = feature.description;
        this.icon = feature.icon;
        this.element = null;
    }

    create() {
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.dataset.featureId = this.id;

        card.innerHTML = `
            <div class="feature-card__icon">${this.icon}</div>
            <h3 class="feature-card__title">${this.title}</h3>
            <p class="feature-card__description">${this.description}</p>
            <button class="feature-card__button" aria-label="Learn more about ${this.title}">
                Learn More
            </button>
        `;

        this.element = card;
        this.addEventListeners();
        return card;
    }

    addEventListeners() {
        if (!this.element) return;

        const button = this.element.querySelector('.feature-card__button');
        
        // Add hover effects
        this.element.addEventListener('mouseenter', () => {
            this.element.classList.add('feature-card--hover');
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.classList.remove('feature-card--hover');
        });

        // Add click handler
        button.addEventListener('click', () => {
            this.handleLearnMore();
        });

        // Add keyboard navigation
        this.element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleLearnMore();
            }
        });
    }

    handleLearnMore() {
        // Example modal implementation
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', `feature-modal-${this.id}`);

        modal.innerHTML = `
            <div class="modal__content">
                <button class="modal__close" aria-label="Close modal">&times;</button>
                <h2 id="feature-modal-${this.id}" class="modal__title">${this.title}</h2>
                <div class="modal__icon">${this.icon}</div>
                <p class="modal__description">${this.description}</p>
                <div class="modal__details">
                    <!-- Additional feature details can be added here -->
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle modal close
        const closeModal = () => {
            modal.classList.add('modal--closing');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300); // Match animation duration
        };

        modal.querySelector('.modal__close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Handle keyboard events
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        // Focus management
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        firstFocusable.focus();

        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });

        // Add animation class after a brief delay
        requestAnimationFrame(() => {
            modal.classList.add('modal--visible');
        });
    }
}

export const initFeatures = (features) => {
    const featuresGrid = document.querySelector('.features__grid');
    if (!featuresGrid) return;

    // Clear existing content
    featuresGrid.innerHTML = '';

    // Create and append feature cards
    features.forEach(feature => {
        const card = new FeatureCard(feature);
        featuresGrid.appendChild(card.create());
    });

    // Add intersection observer for animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('feature-card--visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each feature card
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
};