Installing
==========

Dependencies
------------

Make sure you have the latest version of `node <https://docs.npmjs.com/getting-started/installing-node>`_ installed on your machine as well as the `yarn <https://yarnpkg.com/en/docs/install>`_ package manager.

NPM
---

Install the package's dependencies globally.

::

  $ npm install -g gulp-cli yo generator-politico-interactives

Install the package globally.

::

  $ npm install -g generator-politico-django


Symlink
-------

Alternatively, you can clone a copy of the generator's git repository and use a symlink to install the package. This is especially useful if you'll be developing the generator.

::

  $ git clone git@github.com:The-Politico/generator-politico-django.git

  $ cd generator-politico-django

  $ npm link


.. note::

  To update a symlinked package, just :code:`git pull` the latest changes in the symlinked directory.
