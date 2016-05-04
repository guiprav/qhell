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

let Qh = exports;

let objProtoToString = x => Object.prototype.toString.call(x);

let isArguments = x => objProtoToString(x) === '[object Arguments]';

let isRawValue = x => (
    !Array.isArray(x)
    // TODO: Do proper object detection.
    && !(x instanceof Object)
    && !Q.isPromiseAlike(x)
);

Qh.deepWhen = x => {
    if(isArguments(x)) {
        x = Array.from(x);
    }

    return Q.when(x).then(x => {
        if(isArguments(x)) {
            x = Array.from(x);
        }

        if(Array.isArray(x)) {
            let nx = [];

            return Q.all(x).then(xs => {
                let deferred = Q.defer();

                let pending = 0;

                xs.forEach((x, i) => {
                    if(isRawValue(x)) {
                        nx[i] = x;
                    }
                    else {
                        ++pending;

                        Qh.deepWhen(x).then(x => {
                            nx[i] = x;
                            --pending;

                            if(pending === 0) {
                                deferred.resolve(nx);
                            }
                        }, err => {
                            deferred.reject(err);
                        });
                    }
                });

                if(pending === 0) {
                    deferred.resolve(nx);
                }

                return deferred.promise;
            });
        }

        // TODO: Do proper object detection.
        if(x instanceof Object) {
            // TODO: Try to reuse some of the code from similar
            // array handling above.
            let nx = {};

            let deferred = Q.defer();

            let pending = 0;

            Object.keys(x).forEach(k => {
                let v = x[k];

                if(isRawValue(v)) {
                    nx[k] = v;
                }
                else {
                    ++pending;

                    Qh.deepWhen(v).then(v => {
                        nx[k] = v;
                        --pending;

                        if(pending === 0) {
                            deferred.resolve(nx);
                        }
                    }, err => {
                        deferred.reject(err);
                    });
                }
            });

            if(pending === 0) {
                deferred.resolve(nx);
            }

            return deferred.promise;
        }

        return x;
    });
};

Qh.call = function(fn) {
    return Qh.deepWhen([...arguments].slice(1)).then(args => {
        return fn.apply(null, args);
    });
};

{
    let consoleLog = console.log.bind(console);

    let consoleErr = console.error.bind(console);

    Qh.console = {
        log: function() {
            return Qh.call(consoleLog, ...arguments);
        },

        error: function() {
            return Qh.call(consoleErr, ...arguments);
        },
    };
}

Qh.callMethod = function(fnName, promise) {
    return Q.when(promise).then(x => {
        return x[fnName].apply(x, [...arguments].slice(2));
    });
};

let argList = args => {
    return Qh.deepWhen(args).then(args => {
        if(args.length === 1 && Array.isArray(args[0])) {
            return args[0];
        }

        return args;
    });
};

Qh.and = function() {
    let args = argList(arguments);

    return Qh.callMethod('every', args, x => !!x);
};

Qh.or = function() {
    return argList(arguments).then(args => {
        if(args.length === 0) {
            return true;
        }

        return Qh.callMethod('some', args, x => !!x);
    });
};

Qh.ifElse = (x, tFn, fFn) => {
    return Q.when(x).then(x => {
        return x? tFn() : fFn();
    });
};

{
    let binaryOps = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '%': (a, b) => a % b,

        // TODO: Implement the rest.
    };

    Qh.binaryReduce = function(op) {
        let args = argList([...arguments].slice(1));

        return Qh.callMethod('reduce', args, binaryOps[op]);
    };
}

Qh.add = function() {
    return Qh.binaryReduce('+', arguments);
};

Qh.sub = function() {
    return Qh.binaryReduce('-', arguments);
};

Qh.mult = function() {
    return Qh.binaryReduce('*', arguments);
};

Qh.div = function() {
    return Qh.binaryReduce('/', arguments);
};

Qh.remainder = function() {
    return Qh.binaryReduce('%', arguments);
};
