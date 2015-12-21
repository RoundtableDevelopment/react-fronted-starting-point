var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    gulpSequence  = require('gulp-sequence'),
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
    src: './src/scripts/app.jsx',
    dest: './dist/scripts'
  },
  stylesheets: {
    src: './src/stylesheets/*.scss',
    dest: './dist/stylesheets'
  },
  images: {
    src: './src/images/**/*',
    dest: './dist/images'
  }
}

gulp.task('buildJS', function () {
  return browserify({entries: paths.scripts.src, extensions: ['.jsx'], debug: true})
      .transform('babelify', {presets: ['es2015', 'react']})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gutil.env.type === 'production' ? streamify(uglify()) : gutil.noop())
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(notify({ message: 'JS task complete' }));

});

gulp.task('buildCSS', function() {
  return gulp.src(paths.stylesheets.src)
    .pipe(sass({
      includePaths: [
        './bower_components/bootstrap-sass/assets/stylesheets',
        './bower_components/font-awesome/scss',
      ]
    }))
    .pipe(gutil.env.type === 'production' ? minifyCSS() : gutil.noop())
    .pipe(gulp.dest(paths.stylesheets.dest))
    .pipe(notify({ message: 'CSS task complete' }));
});

gulp.task('images', function() {
  return gulp.src(paths.images.src)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
  return del([paths.scripts.dest, paths.stylesheets.dest, paths.images.dest]);
});

gulp.task('watch', function () {
  gulp.watch('./src/scripts/**/*', ['buildJS', reload]);
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

gulp.task('build', function(cb) {
  gulpSequence('clean', ['watch', 'buildJS', 'buildCSS', 'images'], 'browser-sync', cb);
});

gulp.task('default', ['build'], function() {
  gutil.log(gutil.colors.magenta('Riding the Gulp train...'));
});