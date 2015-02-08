#!/usr/bin/node

var googlefontcssmerge = require('./')
var css = require('css')
var assert = require('assert')

var url = process.argv[2]
assert(url, 'Usage: googlefontcssmerge URL')

googlefontcssmerge(url, function(error, style) {
  if (error) throw(error)

  console.log(css.stringify(style))
})
