'use strict';

const test = require('ava');

const isExe = require('..');
const isExeSync = isExe.sync;

test('exports a function', (t) => {
  t.is(typeof isExe, 'function');
});

test('exports a .sync function', (t) => {
  t.is(typeof isExeSync, 'function');
});
