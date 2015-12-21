var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    minifyCSS   = require('gulp-minify-css'),
    streamify   = require('gulp-streamify'),
    notify      = require('gulp-notify'),
    imagemin    = require('gulp-imagemin'),
    cache       = require('gulp-cache'),
    uglify      = require('gulp-uglify'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),
    del         = require('del'),
    source      = require('vinyl-source-stream'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;

var paths = {
  scripts: {
    src: './app/scripts/app.jsx',
    dest: 'dist/scripts'
  },
  stylesheets: {
    src: './app/stylesheets/*.scss',
    dest: 'dist/stylesheets'
  },
  images: {
    src: './app/images/**/*',
    dest: 'dist/images'
  }
}

gulp.task('buildJS', ['clean'], function () {
  return browserify({entries: paths.scripts.src, extensions: ['.jsx'], debug: true})
      .transform('babelify', {presets: ['es2015', 'react']})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gutil.env.type === 'production' ? streamify(uglify()) : gutil.noop())
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(notify({ message: 'JS task complete' }));

});

gulp.task('buildCSS', ['clean'], function() {
  return gulp.src(paths.stylesheets.src)
    .pipe(sass())
    .pipe(gutil.env.type === 'production' ? minifyCSS() : gutil.noop())
    .pipe(gulp.dest(paths.stylesheets.dest))
    .pipe(notify({ message: 'CSS task complete' }));
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images.src)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
  return del([paths.scripts.dest, paths.stylesheets.dest, paths.images.dest]);
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts.src, ['buildJS', reload]);
  gulp.watch(paths.stylesheets.src, ['buildCSS', reload]);
  gulp.watch(paths.images.src, ['images', reload]);
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});

gulp.task('default', ['watch', 'buildJS', 'buildCSS', 'images', 'browser-sync'], function() {
  gutil.log('stuff happened', 'Really it did', gutil.colors.magenta('123'));
});