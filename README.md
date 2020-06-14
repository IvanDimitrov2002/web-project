# SQLess

SQLess - The Serverless SQL Solution

## Features

- Live reloading
- Cache busting
- SCSS converted to css, auto prefixed and minified with sourcemaps
- Javascript concatenated into a single file, minified with sourcemaps and supports ES6
- Image minifying

## Getting Started

Follow these steps in order to get the website up and running locally on your machine.

### Installation

- `npm install` to install any dependencies
- `npm start` or `gulp watch` to start a live reload session

### Building

- `npm run build` or `gulp` to build the application

### Extras

- `gulp` or `gulp build` to build the application
- `gulp watch` to enable live reload
- `gulp clean` to delete the build folder
- `gulp styles` to run the style tasks
- `gulp scripts` to run the script tasks
- `gulp images` to run the image tasks
- `gulp favicon` to run the favicon tasks

## Hosted
- The project is hosted on Vercel. The link is in the repository's description.

## File Structure

```bash
├── app
│   ├── images
│   │
│   ├── js
│   │   └── *.js
│   │
│   ├── scss
│   │   ├── general
│   │   │
│   │   ├── pages
│   │   │
│   │   └── main.scss
│   │
│   ├── *.html
│   │
│   └── favicon.ico
│
└── build
    ├── assets
    │   ├── images
    │   │
    │   ├── js
    │   │   └── app.min.js
    │   │
    │   └── css
    │       └── styles.min.css
    │
    ├── *.html
    │
    └── favicon.ico
```