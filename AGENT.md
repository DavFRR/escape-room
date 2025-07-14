# AGENT.md - Development Guidelines

## Build/Test/Lint Commands
- `npm start` - Start dev server on port 3001 with hot reload
- `npm run build` - Create production build in dist/
- `npm test` - Run Jest tests
- `npm run lint` - ESLint JavaScript files in src/
- `npm run format` - Format code with Prettier

## Architecture
- Webpack multi-entry project with 4 entry points (main, escapeRoom, room2, room3)
- src/ contains HTML pages, JS modules, styles/, and assets/
- Babel transpilation with ES6+ features, supports last 2 browser versions
- CSS custom properties for theming, BEM methodology
- Code splitting and vendor chunk optimization enabled

## Code Style
- ES6+ JavaScript with async/await patterns
- Modular imports: import '../styles/main.css' for styles
- BEM CSS naming conventions (block__element--modifier)
- CSS custom properties prefixed with -- (e.g., --color-background)
- ESLint and Prettier for consistent formatting
- Use 'Inter' as primary font family
