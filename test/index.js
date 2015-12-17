'use strict'

const os = require('os')
const path = require('path')

const test = require('ava')

const isExe = require('..')
const isExeSync = isExe.sync

const isWindows = os.type().indexOf('Windows') === 0

const fixtureCli = path.join(__dirname, 'fixtures', 'cli')
const fixtureCmd = path.join(__dirname, 'fixtures', 'cli.cmd')

test('exports a function', (t) => {
  t.is(typeof isExe, 'function')
})

test('exports a .sync function', (t) => {
  t.is(typeof isExeSync, 'function')
});

[
  { filePath: fixtureCli, expected: !isWindows },
  { filePath: fixtureCmd, expected: isWindows }
].forEach(({ filePath, expected }) => {
  test(`isExe("${path.basename(filePath)}") resolves with ${expected}`, (t) => {
    return isExe(filePath).then((result) => {
      t.is(result, expected)
    })
  })

  test(`isExe.sync("${path.basename(filePath)}") is ${expected}`, (t) => {
    t.is(isExeSync(filePath), expected)
  })
})
