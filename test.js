'use strict';

let Q = require('q');
let Qh = require('.');

Qh.console.log('1 - Hello, world:', 'Hello, world');
Qh.console.log('2 - [ \'Hello, world\' ]:', [Q.when('Hello, world')]);

// ---

Qh.console.log('3 - 1,2,3:', Qh.callMethod('toString', [1, 2, 3]));

let xs = Q.when([1, 2, 3]);

Qh.callMethod('push', xs, 4, Q.when(5));

Qh.console.log('4 - [ 1, 2, 3, 4, 5 ]:', xs);

// ---

Qh.console.log('5 - true:', Qh.and());

Qh.console.log('6 - true:', Qh.and(1, 2, 3));

Qh.console.log('7 - false:', Qh.and(1, 0, 2, 3));

// --

Qh.console.log('8 - true:', Qh.or());

Qh.console.log('9 - true:', Qh.or(1, 2, 3));

Qh.console.log('10 - true:', Qh.or(0, 0, 0, 0, 0, 1, 0, 0));

Qh.console.log('11 - false:', Qh.or(0, 0, 0));

// ---

Qh.console.log('12 - 24:', Qh.mult(2, Q.when(3), 4));
