const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    const questions = [{
      name: 'appName',
      message: 'What\'s your Django app\'s name?',
      default: path.basename(path.resolve(process.cwd(), '..')),
    }, {
      name: 'staticUrl',
      message: 'What\'s your STATIC_URL (w/out slashes)?',
      default: 'static',
    }];

    return this.prompt(questions).then((answers) => {
      this.appName = answers.appName;
      this.staticUrl = answers.staticUrl;
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
    this.fs.copy(
      this.templatePath('gulp/index.js'),
      this.destinationPath('gulp/index.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/dev.js'),
      this.destinationPath('gulp/tasks/dev.js'));
    this.fs.copyTpl(
      this.templatePath('gulp/tasks/build.js'),
      this.destinationPath('gulp/tasks/build.js'), {
        appName: this.appName,
      });
    this.fs.copyTpl(
      this.templatePath('gulp/server/server.js'),
      this.destinationPath('gulp/server/server.js'), {
        staticUrl: this.staticUrl,
        appName: this.appName,
      });
    // Assets
    this.fs.copy(
      this.templatePath('src/js/main-app.js'),
      this.destinationPath('src/js/main-app.js'));
    this.fs.copy(
      this.templatePath('src/scss/main.scss'),
      this.destinationPath('src/scss/main.scss'));
    // Webpack config
    this.fs.copy(
      this.templatePath('webpack-dev.config.js'),
      this.destinationPath('webpack-dev.config.js'));
    this.fs.copyTpl(
      this.templatePath('webpack-prod.config.js'),
      this.destinationPath('webpack-prod.config.js'), {
        appName: this.appName,
      });
    this.fs.copy(
      this.templatePath('postcss.config.js'),
      this.destinationPath('postcss.config.js'));
    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('./.babelrc'));
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('./.gitignore'));
  }
  install() {
    const dependencies = [
      'autoprefixer',
      'babel-core',
      'babel-eslint',
      'babel-loader',
      'babel-preset-env',
      'babel-preset-es2015',
      'babel-preset-react',
      'express',
      'express-http-proxy',
      'extract-text-webpack-plugin',
      'fs-extra',
      'glob',
      'gulp',
      'lodash',
      'node-sass',
      'open',
      'optimize-css-assets-webpack-plugin',
      'postcss-loader',
      'react',
      'react-dom',
      'sass-loader',
      'style-loader',
      'webpack',
      'webpack-dev-middleware',
      'webpack-hot-middleware',
      'webpack-stream',
      'yargs',
    ];
    this.yarnInstall(dependencies, { save: true });
  }
  end() {
    this.log('Done building you development environment. Run "gulp" to start working!');
  }
};
