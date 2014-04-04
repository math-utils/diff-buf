var diff = require('./');

var buf1 = new Buffer([10, 21, 44, 33, 120]);
var buf2 = new Buffer([10, 22, 35, 54, 120]);

var str = diff(buf1, buf2, {base: process.argv[2] === '10' ? 10 : 16});
console.log(str);
