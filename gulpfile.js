// 引入组件
var gulp = require('gulp');
var coffee = require('gulp-coffee');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var postcss = require('gulp-postcss');
var cssgrace = require('cssgrace');
var cssnext = require("gulp-cssnext");
var clean = require('gulp-clean');
var contentIncluder = require('gulp-content-includer');
var processors = [require('cssgrace')];
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var gulpif = require('gulp-if');
var sprity = require('sprity');
var sprity = require('sprity');
var pixrem = require('gulp-pixrem');
// var imagemin = require('gulp-imagemin');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var sourcemap = require('gulp-sourcemaps');
var replace = require('gulp-replace');
//错误处理
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
//js相关
var jshint = require('gulp-jshint');
//服务器相关
var proxy = 'localhost';
//通用自定义变量
var timestamp = +new Date();
var DEST = './';

// clean任务：
gulp.task('clean', function(cb) {
  del(['./dist'], cb)
})

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
//样式任务
gulp.task('sass', ['clean'], function() {
  return gulp.src(Src.sass)
    .pipe(changed(Src.sass))
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0']
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
gulp.task('sprites', ['clean'], function() {
  //.pipe(changed(Src.icon))
  return sprity.src({
      src: './src/images/icon/**/*.{png,jpg}',
      style: './_icon.scss',
      margin: 2,
      template: './src/template/template.hbs',
      processor: 'css',
      // orientation: 'left-right',
      // 'dimension': [{
      //     ratio: 1,
      //     dpi: 72
      // }, {
      //     ratio: 2,
      //     dpi: 192
      // }],
    })
    .pipe(gulpif('*.png', gulp.dest('./src/images/'), gulp.dest('./src/sass/')))
});
//复制css
gulp.task('csscopy', ['clean'], function() {
  gulp.src(Src.css)
    .pipe(changed(Src.css))
    .pipe(gulp.dest(Dist.cssPath))
});
//复制js
gulp.task('jscopy', ['clean'], function() {
  gulp.src(Src.js)
    .pipe(changed(Src.js))
    .pipe(gulp.dest(Dist.jsPath))
});

//复制font
gulp.task('fontcopy', ['clean'], function() {
  gulp.src(Src.font)
    .pipe(changed(Src.font))
    .pipe(gulp.dest(Dist.fontPath))
});
//复制图片
gulp.task('images', ['clean'], function() {
  return gulp.src(Src.img)
    .pipe(changed(Src.img))
    .pipe(gulp.dest(Dist.imgPath))
});

//静态服务器
gulp.task('browser-sync', function() {
  browserSync.init({
    server: Dist.path
  });


});
// 默认任务
gulp.task('default', ['clean', 'fontcopy', 'csscopy', 'jscopy', 'images', 'concat', 'sass', 'sprites', 'browser-sync']);

//concat拼接
gulp.task('concat', ['clean'], function() {
  gulp.src(Src.html)
    .pipe(contentIncluder({
      includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
    }))
    .pipe(replace(/<img(.*?)src=\"\.\.\/(.*?)>/g, "<img$1src=\"$2>"))
    .pipe(replace(/url\(\.\.(.*?)\)/g, "url\($1\)"))
    .pipe(gulp.dest(Dist.path));
});

// 监听文件变化
gulp.watch(Src.html, function() {
  gulp.run('concat');
});

gulp.watch(Src.sass, function() {
  gulp.run('sass', 'sprites');
});
gulp.watch(Src.css, function() {
  gulp.run('csscopy');
});

gulp.watch(Src.js, function() {
  gulp.run('jscopy');
});

gulp.watch(Src.img, function() {
  gulp.run('images');
});
gulp.watch([Dist.js, Dist.html, Dist.css]).on('change', reload);
