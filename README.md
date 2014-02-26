diff-buf
========

compare two buffer in node.js and output the diff

## Install

```
npm install diff-buf
```

## Usage

```js
var diff = require('diff-buf');

var buf1 = new Buffer([10, 21, 44, 33, 120]);
var buf2 = new Buffer([10, 22, 35, 54, 120]);

var str = diff(buf1, buf2);
console.log(str);
```
=>

![diff](http://ww1.sinaimg.cn/large/69c1d4acgw1edwv9s7b6oj206e00jwea.jpg)

```js
var diff = require('diff-buf');

var buf1 = new Buffer([10, 21, 44, 33, 120]);
var buf2 = new Buffer([10, 22, 35, 54, 120]);

var diffObj = diff(buf1, buf2, {string: false});
console.log(diffObj);
```

=>

```
[ { value: 10, added: undefined, removed: undefined },
  { value: 22, added: true, removed: undefined },
  { value: 21, added: undefined, removed: true },
  { value: 35, added: true, removed: undefined },
  { value: 44, added: undefined, removed: true },
  { value: 54, added: true, removed: undefined },
  { value: 33, added: undefined, removed: true },
  { value: 120, added: undefined, removed: undefined } ]
```

## Options

* length: max length of buffer, default is 1000
* base: output string base, can be 10 or 16, defualt is 16
* string: output type, default is true

## License
MIT
