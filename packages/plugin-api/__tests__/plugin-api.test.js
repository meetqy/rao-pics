"use strict";

const pluginApi = require("..");
const assert = require("assert").strict;

assert.strictEqual(pluginApi(), "Hello from pluginApi");
console.info("pluginApi tests passed");
