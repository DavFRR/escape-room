// Import styles
import '../styles/main.css';

let pageState = 1;

const transitionToNextPage = () => {
    const body = document.body;
    body.style.opacity = '0';
    
    setTimeout(() => {
        if (pageState === 1) {
            document.querySelector('.centered-text').textContent = 'Love you my love';
            pageState = 2;
            body.style.opacity = '1';
        } else if (pageState === 2) {
            // Transition to escape room
            window.location.href = 'escape-room.html';
        }
    }, 500);
};

// Add transition styles
const style = document.createElement('style');
style.textContent = `
    body.start-page {
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);

// Initialize click handler
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', () => {
        if (pageState < 3) {
            transitionToNextPage();
        }
    });
});

// Main render function
const render = () => {
    // Update UI based on state changes
    document.body.classList.toggle('dark-mode', state.darkMode);
    document.querySelector('.nav__menu').classList.toggle('active', state.isNavOpen);
    
    // Render features
    if (state.features.length > 0) {
        const featuresGrid = document.querySelector('.features__grid');
        featuresGrid.innerHTML = state.features
            .map(feature => `
                <div class="feature-card" data-feature-id="${feature.id}">
                    <div class="feature-card__icon">${feature.icon}</div>
                    <h3 class="feature-card__title">${feature.title}</h3>
                    <p class="feature-card__description">${feature.description}</p>
                </div>
            `)
            .join('');
    }

    // Handle loading states
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.style.display = state.loading ? 'block' : 'none';
    }

    // Handle error states
    if (state.error) {
        console.error('Application Error:', state.error);
        // Implement error UI handling
    }
};

// Initialize application
const init = async () => {
    try {
        setState({ loading: true });

        // Initialize modules
        initNavigation(state, setState);
        initFeatures(config.features);
        setupAnimations();
        setupEventListeners();

        // Set initial features
        setState({
            features: config.features,
            loading: false
        });

        // Listen for color scheme changes
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                setState({ darkMode: e.matches });
            });

    } catch (error) {
        setState({
            loading: false,
            error: error.message
        });
    }
};

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', init);