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
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const changed = require('gulp-changed')
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const fileinclude = require('gulp-file-include');
const contentIncluder = require('gulp-content-includer');

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
//html拼接
function html() {
  return src('./src/html/**/*.html')
    .pipe(contentIncluder({
      includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
    }))
    .pipe(replace(/<img(.*?)src=\"\.\.\/(.*?)>/g, "<img$1src=\"$2>"))
    .pipe(dest('build'))
}

//sass
function css() {
  return src('./src/sass/*.scss', {
      sourcemaps: true
    })
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))

    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css', {
      sourcemaps: true
    }))
}

//es6
function js() {
  return src('./src/js/**/*.js', {
      sourcemaps: true
    })
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(dest('build/js', {
      sourcemaps: true
    }))
}
//静态资源复制
function copyer() {
  return src('./src/public/**/*.*', {})
    .pipe(changed('./src/public/**/*.*'))
    .pipe(dest('build/'))
}
//监听文件变化
function watcher() {
  watch('./src/js/*.js', gulp.series('js'));
  watch('./src/sass/*.scss', gulp.series('css'));
  watch(['./src/html/*.html', './src/include/*.html'], gulp.series('html'));
  watch(['./src/public/**/*.*'], gulp.series('copyer'));
}
exports.cleanBuild = cleanBuild;
exports.server = server;
exports.js = js;
exports.css = css;
exports.html = html;
exports.copyer = copyer;
exports.default = series(
  parallel(copyer, html, js, css),
  parallel(watcher,server)
);
