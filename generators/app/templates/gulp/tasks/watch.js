const gulp = require('gulp');

module.exports = () => {
  gulp.watch(['./src/scss/**/*.scss'], ['sass']);
  gulp.watch(['./src/js/**/*.js*'], ['browserify']);
};
