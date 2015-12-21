/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in ./gulp/tasks. Any files in that directory get
  automatically required below.
  To add a new task, simply add a new task file that directory.
  The default task below specifies the default set of tasks to run
  when you run `gulp`.
*/

var requireDir    = require('require-dir');
var gulp          = require('gulp');
var gutil         = require('gulp-util');
var gulpSequence  = require('gulp-sequence');

// Require all tasks in gulpfile.js/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

gulp.task('default', function(callback) {
  gulpSequence('clean', ['watch', 'scripts', 'sass', 'images'], 'browser-sync', callback);
  gutil.log(gutil.colors.magenta('Riding the Gulp train...'));
});