var gulp = require('gulp');
var rollup = require('gulp-rollup');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var watchLess = require('gulp-watch-less');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var watch = require('gulp-watch');

var clientApp = './client/js/app.js';
var lessDir = './client/less/app.less';


gulp.task('app', function() {
  gulp.src('./client/js/**/*.js')
    .pipe(rollup({
      entry: clientApp
    }))
    .pipe(gulp.dest('./public/build'));
});

gulp.task('less', function () {
  return gulp.src(lessDir)
    .pipe(less())
    .pipe(gulp.dest('./public/build'));
});

gulp.task('less_watch', function() {
  return gulp.src(lessDir)
        .pipe(watchLess(lessDir))
        .pipe(less())
        .pipe(gulp.dest('./public/build'));
});

gulp.task('watch', function() {
  gulp.watch([lessDir], ['less']);
  gulp.watch('./client/js/**/*.js', ['app']);
});

gulp.task('compress_js', function() {
  return gulp.src('./public/build/app.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/build'));
});

gulp.task('compress_css', function() {
  return gulp.src('./public/build/app.css')
    .pipe(minify({keepBreaks: true}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/build'));
});


gulp.task('compress', ['compress_css', 'compress_js']);

gulp.task('clean', function() {
  return gulp.src('./public/build/*', {read: false}).pipe(clean());
});

gulp.task('build', ['app', 'less']);

gulp.task('build_min', ['build'], function() {
  return gulp.start('compress');
});


