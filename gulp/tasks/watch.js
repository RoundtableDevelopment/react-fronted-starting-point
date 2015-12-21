var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var config      = require('../config');

gulp.task('watch', function () {
  gulp.watch(config.scripts.src, ['scripts', reload]);
  gulp.watch(config.sass.src, ['sass', reload]);
  gulp.watch(config.images.src, ['images', reload]);
});