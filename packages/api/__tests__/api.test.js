'use strict';

const api = require('..');
const assert = require('assert').strict;

assert.strictEqual(api(), 'Hello from api');
console.info("api tests passed");
