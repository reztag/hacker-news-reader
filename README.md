# Hacker News Reader

Hacker News reader for displaying in new tab bar of Chromium browsers.


## Features

- Updated to support chrome Manifest V3
- React UI
- Redux state management and middleware
- Infinite scrolling story feed
- Link preview support
- Comment box icon which polls the discussion count
- Responsive layout and cleaner codebase
- Uses fallback images for Twitter and Reddit (as they block bots)


## Tech Stack

| Area | Tooling |
| --- | --- |
| App runtime | React 18 |
| State | Redux, Redux Thunk, Reselect |
| Styling | Styled Components |
| Build | Vite |
| Testing | Vitest, Testing Library, JSDOM |

## Installation As A Chrome Extension

1. Build the app first.

   ```sh
   npm install
   npm run build
   ```

2. Open Chrome and go to `chrome://extensions`.

3. Turn on Developer mode.

4. Click **Load unpacked**.

5. Select the project root folder: `hacker-news-reader`.

6. Open a new tab to see the extension in action.

The extension manifest uses the generated `dist/index.html`, so make sure the build step has completed before loading the unpacked extension.
