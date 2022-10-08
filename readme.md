# is-executable

> Check whether a file can be [executed](https://www.yesik.it/blog/2018-the-x-permission-bit)

## Install

```sh
npm install is-executable
```

## Usage

```js
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

## API

### `isExecutable(filePath: string) => Promise<boolean>`

### `isExecutableSync(filePath: string) => boolean`
