'use strict';

const pluginsNsfw = require('..');
const assert = require('assert').strict;

assert.strictEqual(pluginsNsfw(), 'Hello from pluginsNsfw');
console.info("pluginsNsfw tests passed");
