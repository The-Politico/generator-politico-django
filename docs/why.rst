Why this?
=========

At POLITICO, Django is our choice backend, but developing front-end assets in a Python framework isn't always the best experience. For example, to take advantage of the latest JavaScript frameworks, we want to use the latest JS build tools.

This generator represents a package to help seamlessly incorporate a node-based development environment inside a Django application. It creates a build system that integrates directly with Django's normal static files handling while letting you use robust JavaScript module patterns, the latest syntax and stylesheet prepocessors.

We've found it helps keep our apps better organized and our front-end code as clean and modular as our Python in a way that doesn't require any Django gymnastics.
