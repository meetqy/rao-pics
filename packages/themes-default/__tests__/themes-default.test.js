'use strict';

const themesDefault = require('..');
const assert = require('assert').strict;

assert.strictEqual(themesDefault(), 'Hello from themesDefault');
console.info("themesDefault tests passed");
