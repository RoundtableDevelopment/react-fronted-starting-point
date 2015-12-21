var gulp      = require('gulp');
var sass      = require('gulp-sass');
var gutil     = require('gulp-util');
var minifyCSS = require('gulp-minify-css');
var notify    = require('gulp-notify');

var config    = require('../config').sass;

gulp.task('sass', function() {
  return gulp.src(config.src)
    .pipe(sass({
      includePaths: [
        config.bowerDir + "/bootstrap-sass/assets/stylesheets",
        config.bowerDir + "/font-awesome/scss",
      ]
    }))
    .pipe(gutil.env.type === 'production' ? minifyCSS() : gutil.noop())
    .pipe(gulp.dest(config.dest))
    .pipe(notify({ message: 'Sass task complete' }));
});