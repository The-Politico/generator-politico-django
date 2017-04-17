const gulp = require('./gulp')([
  'scss',
  'browserify',
  'watch',
]);

gulp.task('build', ['scss', 'browserify', 'watch']);
gulp.task('default', ['build']);
