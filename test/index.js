'use strict';

const os = require('os');
const path = require('path');

const test = require('ava');

const isExe = require('..');
const isExeSync = isExe.sync;

const fixtureCli = path.join(__dirname, 'fixtures', 'cli');
const fixtureCmd = path.join(__dirname, 'fixtures', 'cli.cmd');

test('exports a function', (t) => {
  t.is(typeof isExe, 'function');
});

test('exports a .sync function', (t) => {
  t.is(typeof isExeSync, 'function');
});

if (os.type().indexOf('Windows') === 0) {
  test('isExe.sync("fixtures\\cli") is false', (t) => {
    t.notOk(isExeSync(fixtureCli));
  });
  test('isExe.sync("fixtures\\cli.cmd") is true', (t) => {
    t.ok(isExeSync(fixtureCmd));
  });

  test('isExe("fixtures\\cli") is false', () => {});
  test('isExe("fixtures\\cli.cmd") is true', () => {});
} else { // OS X or Linux
  test('isExe.sync("fixtures\\cli") is true', (t) => {
    t.ok(isExeSync(fixtureCli));
  });
  test('isExe.sync("fixtures\\cli.cmd") is false', (t) => {
    t.notOk(isExeSync(fixtureCmd));
  });

  test('isExe("fixtures\\cli") is true', () => {});
  test('isExe("fixtures\\cli.cmd") is false', () => {});
}
