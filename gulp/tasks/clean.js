var gulp  = require('gulp');
var del   = require('del');

var config = require('../config');

gulp.task('clean', function() {
  return del([config.sass.dest, config.scripts.dest, config.images.dest]);
});