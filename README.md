# Description

Nodedev is a wrapper for nodemon and node-inspector as a replacement for no longer maintained nodev. It will automatically start Node.js process in debug mode and start node-inspector attached to it.

# Installation

```sh
$ sudo npm install -g nodedev
```

# Usage

Start with default settings:

```sh
$ nodedev ./app.js
```
This will start your script as Node.js application with `--debug=7000` option. To start application paused at first line use:
```sh
$ nodedev --debug-brk ./app.js
```
This will start your application as if it was executed with `--debug-brk=7000` option.

# What doesn't work
Currently there is no way to specify another debugging port apart of `7000`. If you try to debug two applications at the same time it will show error that port is in use. To change this behavior either submit ticket and then I will do it when I have time or send me a pull request.
