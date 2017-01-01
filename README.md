# is-executable.js [![npm module](https://img.shields.io/npm/v/is-executable.svg)](https://www.npmjs.com/package/is-executable) [![AppVeyor Status](https://img.shields.io/appveyor/ci/jokeyrhyme/is-executable-js/master.svg)](https://ci.appveyor.com/project/jokeyrhyme/is-executable-js) [![Travis CI Status](https://travis-ci.org/jokeyrhyme/is-executable.js.svg?branch=master)](https://travis-ci.org/jokeyrhyme/is-executable.js)

cross-platform helper to determine whether a file can be executed


## Why?

Node.js' built-in [`fs.access()`](https://nodejs.org/dist/latest-v5.x/docs/api/fs.html#fs_fs_access_path_mode_callback) is not useful enough for Windows use cases.


## Usage

```js
const isExe = require('is-executable');

isExe.sync('c:\\Windows\\notepad.exe'); // => true on Windows
isExe.sync('/usr/bin/bash'); // => true on OS X / Linux
```


## API


### isExe (filePath: String) => Promise


### isExe.sync (filePath: String) => Boolean
