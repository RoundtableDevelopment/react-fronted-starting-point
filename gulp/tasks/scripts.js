var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var gutil       = require('gulp-util');
var notify      = require('gulp-notify');
var streamify   = require('gulp-streamify');
var uglify      = require('gulp-uglify');

var config      = require('../config').scripts;

gulp.task('scripts', function () {
  return browserify({entries: config.appFile, extensions: ['.jsx'], debug: true})
      .transform('babelify', {presets: ['es2015', 'react']})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gutil.env.type === 'production' ? streamify(uglify()) : gutil.noop())
      .pipe(gulp.dest(config.dest))
      .pipe(notify({ message: 'Scripts task complete' }));

});