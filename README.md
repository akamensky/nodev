[![Build Status](https://travis-ci.org/akamensky/nodev.svg?branch=master)](https://travis-ci.org/akamensky/nodev)
[![Dependency Status](https://david-dm.org/akamensky/nodev.svg)](https://david-dm.org/akamensky/nodev)

# Description

Nodev is a wrapper for `nodemon` and `node-inspector`. It will automatically start Node.js process in debug mode and start node-inspector attached to it.

# Installation

```sh
$ sudo npm install -g nodev
```

# Usage

Start with default settings:

```sh
$ nodev ./app.js
```
This will start your script as Node.js application with `--debug=7000` option. To start application paused at first line use:
```sh
$ nodev --debug-brk ./app.js
```
This will start your application as if it was executed with `--debug-brk=7000` option.

# What doesn't work
See full list of open tickets here : https://github.com/akamensky/nodev/issues I'll be happy to accept pull requests closing those tickets.
