import {expectType} from 'tsd';
import {isExecutable, isExecutableSync} from './index.js';

expectType<Promise<boolean>>(isExecutable('/usr/bin/bash'));
expectType<boolean>(isExecutableSync('/usr/bin/bash'));
