/**
Check whether a file can be executed.

@param filePath - The file to check.

@example
```
import {isExecutable} from 'is-executable';

// On macOS
await isExecutable('/usr/bin/bash');
//=> true

// On macOS
await isExecutable('/Users/sindresorhus/unicorn.png');
//=> false

// On Windows
await isExecutable('c:\\Windows\\notepad.exe');
//=> true
```
*/
export function isExecutable(filePath: string): Promise<boolean>;

/**
Check whether a file can be executed.

@param filePath - The file to check.

@example
```
import {isExecutableSync} from 'is-executable';

// On macOS
isExecutableSync('/usr/bin/bash');
//=> true

// On macOS
isExecutableSync('/Users/sindresorhus/unicorn.png');
//=> false

// On Windows
isExecutableSync('c:\\Windows\\notepad.exe');
//=> true
```
*/
export function isExecutableSync(filePath: string): boolean;
