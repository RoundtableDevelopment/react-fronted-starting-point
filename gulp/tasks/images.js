var gulp      = require('gulp');
var imagemin  = require('gulp-imagemin');
var cache     = require('gulp-cache');
var notify    = require('gulp-notify');

var config    = require('../config').images;

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(config.dest))
    .pipe(notify({ message: 'Images task complete' }));
});