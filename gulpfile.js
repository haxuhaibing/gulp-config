const {
  src,
  dest,
  series,
  watch,
  parallel
} = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const changed = require('gulp-changed')
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const fileinclude = require('gulp-file-include');
const contentIncluder = require('gulp-content-includer');
const connect = require('gulp-connect');

function cleanDir() {
  return gulp.src('build/**/*.*', {
      read: false
    })
    .pipe(clean());
}
// 本地服务器
function devServer() {
  return connect.server({
    root: 'build/',
    port: 8080,
    host: '192.168.0.110',
    livereload: true
  })
}
// 服务器刷新
function serverReload() {
  return src([
      './src/sass/**/*.scss',
      './src/html/*.html',
      '../src/js/*.js',
      './src/public/**/*.*'
    ])
    .pipe(connect.reload());
}


//html拼接
function compileHtml() {
  return src('./src/html/**/*.html')
    .pipe(contentIncluder({
      includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
    }))
    .pipe(replace(/<img(.*?)src=\"\.\.\/(.*?)>/g, "<img$1src=\"$2>"))
    .pipe(dest('build'))

}


//scss转css
function compileScss() {
  return src('./src/scss/**/*.scss')
    .pipe(changed('./build/css'))
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest('build/css'))

}


//es6转js
function compileJs() {
  return src('./src/js/*.js')
    .pipe(changed('./build/js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(dest('build/js'))
}
//image
function compileImage() {
  return src('./src/images/**/*.*')
    .pipe(changed('./build/images'))
    .pipe(dest('./build/images'))
}
//静态资源复制
function compileCopy() {
  return src('./src/public/**/*.*')
    .pipe(changed('./build/'))
    .pipe(dest('./build/'))
}


function watchFn() {
  watch('./src/public/**/*.*', series(compileCopy, serverReload))
  watch('./src/images/**/*.*', series(compileImage, serverReload))
  watch('./src/scss/*.scss', series(compileScss, serverReload))
  watch('./src/html/*.html', series(compileHtml, serverReload))
  watch('../src/js/*.js', series(compileJs, serverReload))
}

// 开发环境
function defaultTask() {
  setTimeout(() => {
    watchFn();
  }, 1500);
  return series(cleanDir, compileCopy, compileImage, compileScss, compileJs, compileHtml, devServer)
}


exports.default = defaultTask();
