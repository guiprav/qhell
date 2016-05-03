'use strict';

let Q = require('q');
let Qq = require('.');

Qq.console.log('1 - Hello, world:', 'Hello, world');
Qq.console.log('2 - [ \'Hello, world\' ]:', [Q.when('Hello, world')]);

// ---

Qq.console.log('3 - 1,2,3:', Qq.callMethod('toString', [1, 2, 3]));

let xs = Q.when([1, 2, 3]);

Qq.callMethod('push', xs, 4, Q.when(5));

Qq.console.log('4 - [ 1, 2, 3, 4, 5 ]:', xs);

// ---

Qq.console.log('5 - true:', Qq.and());

Qq.console.log('6 - true:', Qq.and(1, 2, 3));

Qq.console.log('7 - false:', Qq.and(1, 0, 2, 3));

// --

Qq.console.log('8 - true:', Qq.or());

Qq.console.log('9 - true:', Qq.or(1, 2, 3));

Qq.console.log('10 - true:', Qq.or(0, 0, 0, 0, 0, 1, 0, 0));

Qq.console.log('11 - false:', Qq.or(0, 0, 0));

// ---

Qq.console.log('12 - 24:', Qq.mult(2, Q.when(3), 4));
