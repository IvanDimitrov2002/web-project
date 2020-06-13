const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');

const paths = {
  html: {
    src: './app/**/*.html',
    dest: './build'
  },
  styles: {
    src: './app/scss/**/*.scss',
    dest: './build/assets/css'
  },
  scripts: {
    src: './app/js/**/*.js',
    dest: './build/assets/js'
  },
  images: {
    src: './app/images/**/*',
    dest: './build/assets/images'
  },
  favicon: {
    src: './app/favicon.ico',
    dest: './build'
  }
};

const clean = () => del(['./build']);

// Cache busting to prevent browser caching issues
const curTime = new Date().getTime();
const cacheBust = () =>
  gulp
    .src(paths.html.src)
    .pipe(plumber())
    .pipe(replace(/cb=\d+/g, 'cb=' + curTime))
    .pipe(gulp.dest(paths.html.dest));


// Copies all html files
const html = () =>
  gulp
    .src(paths.html.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.html.dest));

// Convert scss to css, auto-prefix, minify and rename into styles.min.css
const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: require("scss-resets").includePaths
    }).on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        basename: 'styles',
        suffix: '.min'
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());

// Minify all javascript files and concat them into a single app.min.js
const scripts = () =>
  gulp
    .src(paths.scripts.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(terser())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));

// Copy and minify images
const images = () =>
  gulp
    .src(paths.images.src)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));

// Copy the favicon
const favicon = () =>
  gulp
    .src(paths.favicon.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.favicon.dest));

// Watches all .scss, .js and .html changes and executes the corresponding task
const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './build'
    },
    notify: false
  });

  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.favicon.src, favicon).on('change', browserSync.reload);
  gulp.watch(paths.scripts.src, scripts).on('change', browserSync.reload);
  gulp.watch(paths.images.src, images).on('change', browserSync.reload);
  gulp.watch('./app/*.html', html).on('change', browserSync.reload);
}

const build = gulp.series(
  clean,
  gulp.parallel(styles, scripts, images, favicon),
  cacheBust
);

const watch = gulp.series(build, watchFiles);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.favicon = favicon;
exports.watch = watch;
exports.build = build;
exports.default = build;
