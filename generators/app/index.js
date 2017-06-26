const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const questions = [{
      name: 'appName',
      message: 'What\'s your Django app\'s name?',
    }];

    return this.prompt(questions).then((answers) => {
      this.appName = answers.appName;
    });
  }
  subgen() {
    this.composeWith('politico-interactives:linters');
  }
  writing() {
    // Package meta
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        appName: this.appName,
      });
    // Gulp
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'));
    this.fs.copyTpl(
      this.templatePath('gulp/tasks/browserify.js'),
      this.destinationPath('gulp/tasks/browserify.js'), {
        appName: this.appName,
      });
    this.fs.copyTpl(
      this.templatePath('gulp/tasks/scss.js'),
      this.destinationPath('gulp/tasks/scss.js'), {
        appName: this.appName,
      });
    this.fs.copy(
      this.templatePath('gulp/tasks/watch.js'),
      this.destinationPath('gulp/tasks/watch.js'));
    this.fs.copy(
      this.templatePath('gulp/index.js'),
      this.destinationPath('gulp/index.js'));
    // Assets
    this.fs.copy(
      this.templatePath('src/js/main-app.js'),
      this.destinationPath('src/js/main-app.js'));
    this.fs.copy(
      this.templatePath('src/scss/main.scss'),
      this.destinationPath('src/scss/main.scss'));
  }
  install() {
    const dependencies = [
      'babel-preset-es2015',
      'babel-preset-react',
      'babelify',
      'browserify',
      'event-stream',
      'glob',
      'gulp',
      'gulp-babili',
      'gulp-cssnano',
      'gulp-if',
      'gulp-rename',
      'gulp-sass',
      'gulp-sourcemaps',
      'gulp-uglify',
      'gulp-util',
      'react',
      'react-dom',
      'reactify',
      'vinyl-buffer',
      'vinyl-source-stream',
    ];
    this.yarnInstall(dependencies, { save: true });
  }
  end() {
    this.log('Done building you asset development environment. Run "gulp" to start working!');
  }
};
