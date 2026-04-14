# Spline Portfolio

A Vite + React portfolio starter with an interactive 3D Spline scene on the homepage.

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
  components/
    Navbar.jsx          # Fixed top navigation bar
    Navbar.module.css
  pages/
    Home.jsx            # Landing page with 3D Spline scene
    Home.module.css
  App.jsx               # Root component (add new pages here)
  main.jsx
  index.css             # Global CSS variables & reset
```

## Adding New Pages

1. Create `src/pages/YourPage.jsx` and `YourPage.module.css`
2. Import and add it inside `App.jsx`
3. Add a nav link in `Navbar.jsx`

## Changing the 3D Scene

Edit the `SCENE_URL` constant in `src/pages/Home.jsx`:

```js
const SCENE_URL = 'https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode';
```

## Build

```bash
npm run build
```
