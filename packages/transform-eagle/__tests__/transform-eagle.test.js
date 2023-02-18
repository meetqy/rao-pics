'use strict';

const transformEagle = require('..');
const assert = require('assert').strict;

assert.strictEqual(transformEagle(), 'Hello from transformEagle');
console.info("transformEagle tests passed");
