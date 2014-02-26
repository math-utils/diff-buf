/*!
 * diff-buf - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var color = require('colors');
var jsdiff = require('diff');

var defaultOptions = {
  length: 1000,
  base: 16,
  string: true
};

function merge(dis, src) {
  for (var key in src) {
    if (dis[key] === undefined) {
      dis[key] = src[key];
    }
  }
}

function parseDiff(diffs, base) {
  var result = [];
  diffs.forEach(function (diff) {
    var added = diff.added;
    var removed =diff.removed;
    var values = diff.value.split(' ').filter(function (v) {
      return v !== '';
    }).map(function (v) {
      return {
        value: parseInt(v, 10),
        added: added,
        removed: removed
      };
    });
    result = result.concat(values);
  });

  return result;
}

function padding(s, base) {
  if (base === 16 && s.length === 1) {
    return '0' + s;
  }
  if (base === 10 && s.length === 1) {
    return '00' + s;
  }
  if (base === 10 && s.length === 2) {
    return '0' + s;
  }
  return s;
}

function inspect(diffs, base) {
  var strs = diffs.map(function (diff) {
    var s = diff.value.toString(base);
    s = padding(s, base);
    if (diff.added) {
      s = s.green;
    } else if (diff.removed) {
      s = s.red;
    }
    return s;
  });

  return '<Buffer ' + strs.join(' ') + '>';
}

module.exports = function (src, cmp, options) {
  options = options || {};
  merge(options, defaultOptions);
  var base = options.base === 10 ? 10 : 16; // only support 10 or 16
  var length = Math.max(src.length, cmp.length, options.length);

  src.slice(0, length);
  cmp.slice(0, length);

  var srcStr = src.toJSON().join(' ');
  var cmpStr = cmp.toJSON().join(' ');

  var diffs = jsdiff.diffWords(srcStr, cmpStr);
  diffs = parseDiff(diffs);
  if (!options.string) {
    return diffs;
  }
  return inspect(diffs, base);
};
