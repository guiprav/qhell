// Copyright (C) 2016 Guilherme Prá Vieira (super.driver.512@gmail.com)
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public
// License along with this program. If not, see
// <http://www.gnu.org/licenses/>.

'use strict';

let Q = require('q');
let Qh = require('.');

Qh.console.log('1 - Hello, world:', 'Hello, world').done();
Qh.console.log('2 - [ \'Hello, world\' ]:', [Q.when('Hello, world')]).done();

// ---

Qh.console.log('3 - 1,2,3:', Qh.callMethod('toString', [1, 2, 3])).done();

let xs = Q.when([1, 2, 3]);

Qh.callMethod('push', xs, 4, Q.when(5)).done();

Qh.console.log('4 - [ 1, 2, 3, 4, 5 ]:', xs).done();

// ---

Qh.console.log('5 - true:', Qh.and()).done();

Qh.console.log('6 - true:', Qh.and(1, 2, 3)).done();

Qh.console.log('7 - false:', Qh.and(1, 0, 2, 3)).done();

// --

Qh.console.log('8 - true:', Qh.or()).done();

Qh.console.log('9 - true:', Qh.or(1, 2, 3)).done();

Qh.console.log('10 - true:', Qh.or(0, 0, 0, 0, 0, 1, 0, 0)).done();

Qh.console.log('11 - false:', Qh.or(0, 0, 0)).done();

// ---

Qh.console.log('12 - 24:', Qh.mult(2, Q.when(3), 4)).done();

// ---

Qh.ifElse(
    Q.when(true),
        () => console.log('13 - ok'),
        () => console.log('13 - error')
).done();

Qh.ifElse(
    Q.when(false),
        () => console.log('13 - error'),
        () => console.log('13 - ok')
).done();
