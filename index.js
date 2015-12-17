'use strict';

var os = require('os');
var path = require('path');

var fs = require('graceful-fs');

var isWindows = os.type().indexOf('Windows') === 0;

var pathExts = !isWindows ? [] : (function () {
  /* eslint-disable no-process-env */ // need this for cross-platform use
  return (process.env.PATHEXT || '').split(';').map(function (pathExt) {
    return pathExt.toLowerCase();
  });
  /* eslint-enable no-process-env */
}());

module.exports = function isExe (filePath) {
  return new Promise(function (resolve) {
    fs.access(filePath, fs.X_OK, function (err) {
      if (err) {
        resolve(false);
        return;
      }
      if (isWindows) {
        resolve(~pathExts.indexOf(path.extname(filePath)));
        return;
      }
      resolve(true);
    });
  });
};

module.exports.sync = function isExeSync (filePath) {
  try {
    fs.accessSync(filePath, fs.X_OK);
    return !isWindows ? true : ~pathExts.indexOf(path.extname(filePath));
  } catch (err) {
    return false;
  }
};
