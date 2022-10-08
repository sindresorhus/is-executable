import process from 'node:process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import {isExecutable, isExecutableSync} from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isWindows = process.platform === 'win32';
const fixtureCli = path.join(__dirname, 'fixtures', 'cli');
const fixtureCmd = path.join(__dirname, 'fixtures', 'cli.cmd');

for (const {filePath, expected} of [
	{filePath: fixtureCli, expected: !isWindows},
	{filePath: fixtureCmd, expected: isWindows},
]) {
	test(`isExecutable('${path.basename(filePath)}') resolves with ${expected}`, async t => {
		t.is(await isExecutable(filePath), expected);
	});

	test(`isExecutableSync('${path.basename(filePath)}') is ${expected}`, t => {
		t.is(isExecutableSync(filePath), expected);
	});
}
