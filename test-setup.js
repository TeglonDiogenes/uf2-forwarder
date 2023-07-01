/*
 * test-setup.js
 * Copyright (C) 2023 mrubanov717 <mrubanov717@nilgroun>
 *
 * Distributed under terms of the MIT license.
 */
const mocha = require('mocha')
const chai = require('chai')
global.description = mocha.description
global.mocha = mocha
global.chai = chai
module.exports = {
  mocha, chai
}
