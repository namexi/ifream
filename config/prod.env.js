'use strict'
const merge = require('webpack-merge')
const debugEnv = require('./debug.env')
module.exports = merge(debugEnv,{
  NODE_ENV: '"production"'
})
