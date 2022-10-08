import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

const isWindows = process.platform === 'win32';
const pathExts = isWindows ? new Set(process.env.PATHEXT?.split(';').map(pathExt => pathExt.toLowerCase())) : [];

export async function isExecutable(filePath) {
	try {
		await fsPromises.access(filePath, fs.X_OK);
		return isWindows ? pathExts.has(path.extname(filePath)) : true;
	} catch {
		return false;
	}
}

export function isExecutableSync(filePath) {
	try {
		fs.accessSync(filePath, fs.X_OK);
		return isWindows ? pathExts.has(path.extname(filePath)) : true;
	} catch {
		return false;
	}
}
