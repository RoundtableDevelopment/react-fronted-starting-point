var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var streamify   = require('gulp-streamify');
var del         = require('del');
var source      = require('vinyl-source-stream');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('build', function () {
  return browserify({entries: './app/scripts/app.jsx', extensions: ['.jsx'], debug: true})
      .transform('babelify', {presets: ['es2015', 'react']})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('watch', ['build'], function () {
  gulp.watch('./app/scripts/*.jsx', ['build', reload]);
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});

gulp.task('default', ['watch','browser-sync']);