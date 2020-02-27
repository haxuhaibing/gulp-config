const {
  src,
  dest,
  series,
  task,
  watch,
  parallel
} = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const browserSync = require('browser-sync'), // 自动刷新
  reload = browserSync.reload;
const changed = require('gulp-changed')
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

function cleanBuild() {
  return gulp.src('build/**', {
      read: false
    })
    .pipe(clean());
}
// server
function server() {
  browserSync.init({
    port: 9000,
    server: {
      baseDir: 'build/',
      index: 'index.html'
    }
  })
  gulp.watch('build/**/*').on('change', reload)
}

function html() {
  return src('./src/html/*.html')
    .pipe(dest('build'))
}

function images() {
  return src('./src/images/**/*.*')
    .pipe(dest('build/images'))
}

function css() {
  return src('./src/sass/*.scss', {
      sourcemaps: true
    })
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))

    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css', {
      sourcemaps: true
    }))
}


function js() {
  return src('./src/js/*.js', {
      sourcemaps: true
    })
    .pipe(dest('build/js', {
      sourcemaps: true
    }))
}


function jsWatch() {
  watch('./src/js/*.js', gulp.series('js'));
}

function cssWatch() {
  watch('./src/sass/*.scss', gulp.series('css'));
}

function htmlWatch() {
  watch('./src/html/*.html', gulp.series('html'));
}
exports.cleanBuild = cleanBuild;
exports.server = server;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(html, js, css, images, jsWatch, cssWatch, htmlWatch, server);
