var gulp        = require('gulp');
var gutil       = require('gulp-util');
var sass        = require('gulp-sass');
var minifyCSS   = require('gulp-minify-css');
var browserify  = require('browserify');
var babelify    = require('babelify');
var streamify   = require('gulp-streamify');
var del         = require('del');
var source      = require('vinyl-source-stream');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var paths = {
  scripts: './app/scripts/app.jsx',
  stylesheets: './app/stylesheets/*.scss',
}

gulp.task('buildJS', ['clean'], function () {
  return browserify({entries: paths.scripts, extensions: ['.jsx'], debug: true})
      .transform('babelify', {presets: ['es2015', 'react']})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gutil.env.type === 'production' ? streamify(uglify()) : gutil.noop())
      .pipe(gulp.dest('dist'));
});

gulp.task('buildCSS', ['clean'], function() {
  return gulp.src(paths.stylesheets)
    .pipe(sass())
    .pipe(gutil.env.type === 'production' ? minifyCSS() : gutil.noop())
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['buildJS', reload]);
  gulp.watch(paths.stylesheets, ['buildCSS', reload]);
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});

gulp.task('default', ['watch', 'buildJS', 'buildCSS', 'browser-sync'], function() {
  gutil.log('stuff happened', 'Really it did', gutil.colors.magenta('123'));
});