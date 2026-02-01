import process from 'node:process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import fsPromises from 'node:fs/promises';
import test from 'ava';
import {isExecutable, isExecutableSync} from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isWindows = process.platform === 'win32';
const fixtureCli = path.join(__dirname, 'fixtures', 'cli');
const fixtureCmd = path.join(__dirname, 'fixtures', 'cli.cmd');

test('isExecutable returns false for directories', async t => {
	t.is(await isExecutable(__dirname), false);
});

test('isExecutableSync returns false for directories', t => {
	t.is(isExecutableSync(__dirname), false);
});

test('isExecutable returns false for non-executable files', async t => {
	if (isWindows) {
		t.pass();
		return;
	}

	const temporaryDirectory = path.join(__dirname, 'temp');
	const temporaryFilePath = path.join(temporaryDirectory, `not-executable-${process.pid}-${Date.now()}`);

	await fsPromises.mkdir(temporaryDirectory, {recursive: true});

	try {
		await fsPromises.writeFile(temporaryFilePath, '');
		await fsPromises.chmod(temporaryFilePath, 0o644);

		t.is(await isExecutable(temporaryFilePath), false);
		t.is(isExecutableSync(temporaryFilePath), false);
	} finally {
		await fsPromises.unlink(temporaryFilePath).catch(() => {});
		await fsPromises.rmdir(temporaryDirectory).catch(() => {});
	}
});

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
