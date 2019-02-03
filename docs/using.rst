Using
=====

Concepts
--------

The generator builds the structure for a lightweight application that will compile your static assets using Webpack.

In development, the app will proxy Django's development server, serve your static files and push changes to your browser using `Hot Module Replacement <https://webpack.github.io/docs/hot-module-replacement.html>`_.

After you're done developing, the app will build your static assets, which will minify scripts and styles and move them to the normal static directory of your app, i.e., :code:`js/` and :code:`css/` directories.

.. warning::

  This app presumes your static directory is structured in the `standard Django way using namespacing <https://docs.djangoproject.com/en/dev/intro/tutorial06/#customize-your-app-s-look-and-feel>`_. For example: :code:`<your app>/static/<your app>/js/`

Setup
-----

1. Within your Django application, make a new folder that will contain your raw assets.

  .. code::

    $ mkdir staticapp
    $ cd staticapp

  .. note::

    You can name the directory whatever, but we'll assume you've called it :code:`staticapp` throughout these docs.

2. Run the generator.

  .. code::

    $ yo politico-django


Developing assets
-----------------

To begin developing assets, simply start the development pipeline in your :code:`staticapp` directory.

.. code::

  $ yarn start

During development, the app will proxy Django's own default web server, i.e., :code:`runserver`. You can customize the proxied port number using the :code:`proxy` argument, which defaults to :code:`8000`.

.. code::

  $ yarn start --proxy 8008


JavaScript
^^^^^^^^^^

Write your scripts using modern `ES2015 <https://babeljs.io/learn-es2015/>`_ syntax. Babel transforms for React/JSX are also included by default.

In order to build separate scripts for different views in your app, Webpack will look for bundle entries using a glob pattern :code:`main.*.js*`. So simply prefix any JS or JSX files with :code:`main.` to create a new bundle at the root of your :code:`src/` directory.

For example, these scripts will be compiled into a single bundle, :code:`main.app.js`:

.. code-block:: javascript

  // abide.js

  export default (name) => {
    console.log(`The ${name} abides!`)
  };

.. code-block:: javascript

  // main-app.js

  import Abide from './abide';

  Abide('Dude');



SCSS
^^^^

Import SCSS files in your JavaScript.

.. code-block:: javascript

  import './theme/base.scss';;

As per the POLITICO `JS Apps Style Guide <https://docs.politicoapps.com/politico-newsroom-developer-guide/guides/front-end-apps>`_, SCSS files outside your :code:`theme/` directory will be imported as `CSS modules <https://github.com/css-modules/css-modules>`_.


.. figure:: https://i.makeagif.com/media/7-08-2015/NACqoF.gif

  You got styles in my scripts!

Django templates
^^^^^^^^^^^^^^^^

In your Django templates, you can reference scripts and styles using Django's `static files template tag <https://docs.djangoproject.com/en/1.11/howto/static-files/>`_.

.. code-block:: django

  {% load static %}

  <link rel="stylesheet" href="{% static '<your app>/css/main.app.css' %}" />

  <script src="{% static '<your app>/js/main.app.js' %}"></script>


In development, the development server will serve your JavaScript modules at the location of your app's static directory. For example: :code:`localhost:3000/static/myapp/js/main.app.js`.

Your styles will be delivered within your JavaScript bundle and injected onto the page. This lets Webpack automatically refresh your styles as you develop.

.. note::

  Because the proxy server serves your styles via JavaScript in development, you should see a 404 error in your template for your link tag.

  When you build your scripts for production, the styles will be split into a separate file **named after your module.** For example, a module named :code:`main.app.js` will split CSS styles to a stylesheet at :code:`css/main.app.css`.


.. warning::

  If you build your static assets and then return to using the development server, keep in mind, that your previously built styles may be included in your template. So using the above example, a stale :code:`main.app.css` may be referenced in your template.

  If you're simply overwriting styles, the new styles will be injected after the reference to the stale built asset and shouldn't cause a problem, but any other style conflicts may show through.

  Best practice if you're revisiting assets is to delete the stale built files from your app's static directory.

.. note::

  Any changes you make to JavaScript or SCSS files will be automatically reflected in your browser via Hot Module Replacement. Any changes you make in your template's HTML or your Django view will still require you to refresh your browser.



Building production assets
--------------------------

Once you've finished developing assets. Run Gulp's build task inside your :code:`staticapp` directory:

.. code::

  $ yarn build

This will minify your bundles, separate CSS bundles and move scripts and stylesheets to your app's static files folder.
