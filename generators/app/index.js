const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    const questions = [{
      name: 'appName',
      message: 'What\'s your Django app\'s name?',
      default: path.basename(path.resolve(process.cwd(), '..')),
    }];

    return this.prompt(questions).then((answers) => {
      this.appName = answers.appName;
    });
  }
  writing() {
    // Package meta
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        appName: this.appName,
      });
    // Assets
    this.fs.copy(
      this.templatePath('src/main.app.js'),
      this.destinationPath('src/main.app.js'));
    this.fs.copy(
      this.templatePath('src/theme/base.scss'),
      this.destinationPath('src/theme/base.scss'));
    // Webpack config
    this.fs.copyTpl(
      this.templatePath('webpack.config.dev.js'),
      this.destinationPath('webpack.config.dev.js'), {
        appName: this.appName,
      });
    this.fs.copyTpl(
      this.templatePath('webpack.config.prod.js'),
      this.destinationPath('webpack.config.prod.js'), {
        appName: this.appName,
      });
    this.fs.copy(
      this.templatePath('eslintrc.json'),
      this.destinationPath('./.eslintrc.json'));
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('./.gitignore'));
  }
  install() {
    this.yarnInstall();
  }
  end() {
    this.log('Done building you development environment. Run "yarn start" to start working!');
  }
};
