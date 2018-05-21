// 引入组件
const gulp = require('gulp');
const coffee = require('gulp-coffee');
const changed = require('gulp-changed');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const cssgrace = require('cssgrace');
const cssnext = require("gulp-cssnext");
const clean = require('gulp-clean');
const contentIncluder = require('gulp-content-includer');
const processors = [require('cssgrace')];
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const gulpif = require('gulp-if');
const pixrem = require('gulp-pixrem');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const pump = require('pump');
const runSequence = require('run-sequence');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const sourcemap = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const jshint = require('gulp-jshint');
const proxy = 'localhost';
const spritesmith = require('gulp.spritesmith');
const timestamp = +new Date();
const DEST = './dist';
const cache = require('gulp-cache');
//源文件
var Src = {
  js: 'src/js/**/*.js',
  sass: 'src/sass/*.scss',
  css: 'src/sass/**/*.css',
  html: 'src/html/*.html',
  img: 'src/images/**/*.*',
  font: 'src/fonts/**/*.*',
  icon: 'src/images/icon/*.*',
};

//构建文件
var Dist = {
  js: 'dist/js/*.js',
  css: 'dist/css/*.css',
  html: 'dist/*.html',
  img: 'dist/images/**/*.*',
  path: 'dist',
  jsPath: 'dist/js/',
  cssPath: 'dist/css/',
  htmlPath: 'dist/html/',
  imgPath: 'dist/images/',
  fontPath: 'dist/fonts/',
};
// clean任务：
gulp.task('clean', function(cb) {
  del([
    './dist/**/*',
  ], cb);
});

//复制font

gulp.task('fontcopy', function() {
  gulp.src(Src.font)
    .pipe(changed(Src.font))
    .pipe(gulp.dest(Dist.fontPath))
});


//样式任务
gulp.task('sass', function() {
  return gulp.src(Src.sass)
    .pipe(changed(Src.sass))
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(autoprefixer({
      browsers: ["last 5 version", "iOS >= 7", "Android >= 4"]
    }))
    .pipe(postcss(processors))
    //手机暂停使用
    // .pipe(pixrem({ rootValue: '100px' }))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(sourcemap.write('./maps'))
    .pipe(gulp.dest(Dist.cssPath));
});
// 雪碧图
gulp.task('sprites', function() {
  var spriteData = gulp.src(Src.icon)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '/src/sass/_icon.scss',
      cssFormat: 'scss',
      cssTemplate: 'src/template/scss.hbs'
    }));
  return spriteData.pipe(gulp.dest("src/images"));
});
//复制css
gulp.task('csscopy', function() {
  gulp.src(Src.css)
    .pipe(changed(Src.css))
    .pipe(gulp.dest(Dist.cssPath))
});
//复制js
gulp.task('jscopy', function() {
  gulp.src(Src.js)
    .pipe(changed(Src.js))
    .pipe(gulp.dest(Dist.jsPath))
});

//图片
gulp.task('images', function() {
  return gulp.src(Src.img)
    //  .pipe(changed(Src.img))
    // .pipe(cache(imagemin({
    //   optimizationLevel: 5,
    //   progressive: true,
    //   interlaced: true
    // })))
    .pipe(gulp.dest(Dist.imgPath))
});

//静态服务器
gulp.task('browser-sync', function() {
  browserSync.init({
    server: DEST
  });
});
//html拼接
gulp.task('concat', function() {
  gulp.src(Src.html)
    .pipe(contentIncluder({
      includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
    }))
    .pipe(replace(/<img(.*?)src=\"\.\.\/(.*?)>/g, "<img$1src=\"$2>"))
    .pipe(replace(/url\(\.\.(.*?)\)/g, "url\($1\)"))
    .pipe(gulp.dest(Dist.path));
});
// 默认任务
gulp.task('default', ['sass', 'csscopy', 'jscopy', 'sprites', 'images', 'fontcopy', 'concat', 'browser-sync', 'watch']);


// 监听文件变化
gulp.task('watch', function() {
  gulp.watch(Src.html, ['concat']);
  gulp.watch(Src.sass, ['sass']);
  gulp.watch(Src.css, ['csscopy']);
  gulp.watch(Src.js, ['jscopy']);
  gulp.watch(Src.img, ['images']);
  gulp.watch(Src.icon, ['sprites', 'images', 'sass']);
  gulp.watch([Dist.js, Dist.html, Dist.css]).on('change', reload);
});
