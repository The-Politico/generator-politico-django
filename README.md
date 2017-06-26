![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# generator-politico-django [![npm](https://img.shields.io/npm/v/generator-politico-django.svg)](https://www.npmjs.com/package/generator-politico-django)


A [Yeoman](http://yeoman.io) generator to scaffold a static assets development environment inside a Django app.

### What it does:

- Scaffolds your development directory.
- Compiles SCSS and bundles JS written in modular ES2015 using [browserify](http://browserify.org/) to the standard static directory for your Django app.

### What you'll need installed

Make sure you have [node](https://docs.npmjs.com/getting-started/installing-node) installed as well as the [yarn](https://yarnpkg.com/en/docs/install) package manager.

Then install [gulp](http://gulpjs.com/), [yeoman](http://yeoman.io/) and this generator, globally*:
```
$ npm install -g gulp-cli yo generator-politico-interactives generator-politico-django
```
_\* You may need to prefix with `sudo`_


### How to use

Inside your Django app, create a fresh directory called `staticapp` at the root of your app and move into it:

```bash
$ mkdir staticapp
$ cd staticapp
```

Now run the generator and answer the questions it asks to build your dev environment.

```bash
$ yo politico-django
```

After the generator is finished, run gulp to start the development server.

```bash
$ gulp
```

Develop files in the `src` directory and they will be automatically compiled to the `static` directory of your app, assuming a structure like this:

- `<app_name>/static/<app_name>/js/`
- `<app_name>/static/<app_name>/css/`

Then you can simply use the standard static template tag to include your built assets in your Django templates:

```HTML
{%load staticfiles%}
<link href="{%static '<app_name>/css/styles.css'%}" rel="stylesheet">
```

##### Javascript module naming convention

Browserify will watch for javascript files prefixed with `main-*.js` to bundle into modules. It will ignore all other files in the `staticapp/src/js` directory, but of course you can include those files in your `main-` scripts.

For example:

```javascript
// my-sub-modules.js
modules.exports = () => {
    console.log('Hello world.');
}
```

```javascript
// main-my-module.js
import myThing from 'my-sub-module.js';

myThing();
```


This helps you write more modular code.

## Developing

To develop, clone this repository and use `npm link` to test changes locally before publishing updates.
