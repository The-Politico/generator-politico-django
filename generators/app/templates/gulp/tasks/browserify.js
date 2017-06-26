const gulp = require('gulp');
const gulpif = require('gulp-if');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const es = require('event-stream');
const path = require('path');
const glob = require('glob');
const gutil = require('gulp-util');
const babelify = require('babelify');
const babili = require('gulp-babili');


const production = task => gulpif(process.env.NODE_ENV === 'production', task);

module.exports = (done) => {
  glob('./src/js/main-**.{js,jsx}', (err, files) => {
    if (err) done(err);

    const tasks = files.map((entry) => {
      const props = {
        entries: [entry],
        extensions: ['.js', '.jsx'],
        cache: {},
        packageCache: {},
        debug: true,
      };

      const bundler = browserify(props)
                      .transform(babelify, {
                        presets: ['es2015', 'react'],
                      });

      const bundle = () => bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(path.basename(entry)))
        .pipe(buffer())
        .pipe(rename({ extname: '.bundle.js' }))
        .pipe(production(sourcemaps.init({ loadMaps: true })))
        .pipe(production(babili({
          removeConsole: true,
          mangle: {
            keepClassNames: true,
          },
        }).on('error', gutil.log)))
        .pipe(production(sourcemaps.write('./')))
        .pipe(gulp.dest('./../static/<%= appName %>/js/'));

      bundler.on('log', gutil.log);
      bundler.on('update', bundle);

      return bundle();
    });

    es.merge(tasks).on('end', done);
  });
};
