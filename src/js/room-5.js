import '../styles/main.css';

let pageState = 1;

const transitionToNextPage = () => {
    const body = document.body;
    body.style.opacity = '0';
    
    setTimeout(() => {
        if (pageState === 1) {
            document.querySelector('.centered-text').textContent = 'Si ves esto esq hay un error en mi código uwu';
            pageState = 2;
            body.style.opacity = '1';
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

document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.querySelector('.yes-button');
    const noButton = document.querySelector('.no-button');

    yesButton.addEventListener('mouseover', () => {
            const videoContainer = document.querySelector('.video-container');
            const videoElement = videoContainer.querySelector('video');
            let gifElement = videoContainer.querySelector('.gif-element');

            if (videoElement) {
                videoElement.style.display = 'none';
            }

            if (!gifElement) {
                gifElement = document.createElement('img');
                gifElement.classList.add('gif-element');
                gifElement.src = 'assets/happy-cat.gif';
                gifElement.style.position = 'absolute';
                gifElement.style.top = '0';
                gifElement.style.left = '0';
                gifElement.style.width = '100%';
                gifElement.style.height = '100%';
                gifElement.style.objectFit = 'cover';
                gifElement.style.zIndex = '1'; // Ensure it's above the video
                videoContainer.appendChild(gifElement);
            } else {
                gifElement.style.display = 'block';
            }
        });

        yesButton.addEventListener('mouseout', () => {
            const videoContainer = document.querySelector('.video-container');
            const videoElement = videoContainer.querySelector('video');
            const gifElement = videoContainer.querySelector('.gif-element');

            if (gifElement) {
                gifElement.style.display = 'none';
            }

            if (videoElement) {
                videoElement.style.display = 'block';
                videoElement.src = 'assets/freaky-sonic.mp4'; // Ensure video source is correct
                videoElement.loop = true;
                videoElement.play();
            }
        });

        yesButton.addEventListener('click', () => {
            window.location.href = 'room-6.html';
        });

    noButton.addEventListener('mouseover', () => {
        const maxX = window.innerWidth - noButton.offsetWidth;
        const maxY = window.innerHeight - noButton.offsetHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        noButton.style.position = 'absolute';
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    });

    noButton.addEventListener('click', () => {
        // Handle NO button click
    });
});

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', init);