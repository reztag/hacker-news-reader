# Hacker News Reader Agent Guidelines

## Development Commands
- `npm install` - Install dependencies
- `npm run dev` or `npm start` - Start development server
- `npm run build` - Build for production (creates dist/)
- `npm run preview` - Preview built application
- `npm run test` - Run all tests

## Important Notes
- Extension requires build step before loading in Chrome: `npm run build` then load `dist/` as unpacked extension
- Test files use `.spec.js` naming convention and are colocated with source
- Aliases configured in vite.config.js: `@components`, `@services`, `@store`, `@styles`, `@utils`
- Built extension uses `dist/index.html` - must build before testing as Chrome extension
- Uses React 18, Redux Toolkit, Styled Components, Vite, Vitest
- Entry point: `src/index.jsx`
- Extension configuration: `manifest.json` (Chrome Manifest V3)

## Project Structure
- `/src` - Source code
  - `/components` - React components
  - `/services` - API services (Hacker News, link preview)
  - `/store` - Redux store, reducers, actions, middleware
  - `/styles` - Styled components and theme
  - `/utils` - Utility functions
- `/dist` - Built output (generated)
- `/public` - Static assets

## Testing
- Run tests: `npm run test`
- Test environment: Vitest with JSDOM
- Test files: `*.spec.js` or `*.test.js` (both used)
- Setup: `src/setupTests.js`