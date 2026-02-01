import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

const isWindows = process.platform === 'win32';
const pathExts = isWindows ? new Set(process.env.PATHEXT?.split(';').map(pathExt => pathExt.toLowerCase())) : [];

export async function isExecutable(filePath) {
	try {
		const stats = await fsPromises.stat(filePath);

		if (isWindows) {
			return stats.isFile() && pathExts.has(path.extname(filePath));
		}

		if (!stats.isFile()) {
			return false;
		}

		await fsPromises.access(filePath, fs.constants.X_OK);
		return true;
	} catch {
		return false;
	}
}

export function isExecutableSync(filePath) {
	try {
		const stats = fs.statSync(filePath);

		if (isWindows) {
			return stats.isFile() && pathExts.has(path.extname(filePath));
		}

		if (!stats.isFile()) {
			return false;
		}

		fs.accessSync(filePath, fs.constants.X_OK);
		return true;
	} catch {
		return false;
	}
}
