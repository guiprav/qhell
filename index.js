'use strict';

let Q = require('q');

let Qq = exports;

let objProtoToString = x => Object.prototype.toString.call(x);

let isArguments = x => objProtoToString(x) === '[object Arguments]';

Qq.deepWhen = x => {
    if(isArguments(x)) {
        x = Array.from(x);
    }

    return Q.when(x).then(x => {
        if(Array.isArray(x)) {
            let nx = [];

            return Q.all(x).then(xs => {
                return Q.all(xs.map(x => Qq.deepWhen(x)));
            });
        }

        // TODO: Do proper object detection.
        if(typeof x === 'object') {
            let nx = {};

            return Q.all(Object.keys(x).map(k => {
                return Qq.deepWhen(x[k]).then(v => {
                    nx[k] = v;
                });
            })).then(() => nx);
        }

        return x;
    });
};

Qq.call = function(fn) {
    return Qq.deepWhen([...arguments].slice(1)).then(args => {
        return fn.apply(null, args);
    });
};

{
    let consoleLog = console.log.bind(console);

    let consoleErr = console.error.bind(console);

    Qq.console = {
        log: function() {
            return Qq.call(consoleLog, ...arguments);
        },

        error: function() {
            return Qq.call(consoleErr, ...arguments);
        },
    };
}

Qq.callMethod = function(fnName, promise) {
    return Q.when(promise).then(x => {
        return x[fnName].apply(x, [...arguments].slice(2));
    });
};

let argList = args => {
    return Qq.deepWhen(args).then(args => {
        if(args.length === 1 && Array.isArray(args[0])) {
            return args[0];
        }

        return args;
    });
};

Qq.and = function() {
    let args = argList(arguments);

    return Qq.callMethod('every', args, x => !!x);
};

Qq.or = function() {
    return argList(arguments).then(args => {
        if(args.length === 0) {
            return true;
        }

        return Qq.callMethod('some', args, x => !!x);
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

    Qq.binaryReduce = function(op) {
        let args = argList([...arguments].slice(1));

        return Qq.callMethod('reduce', args, binaryOps[op]);
    };
}

Qq.add = function() {
    return Qq.binaryReduce('+', arguments);
};

Qq.sub = function() {
    return Qq.binaryReduce('-', arguments);
};

Qq.mult = function() {
    return Qq.binaryReduce('*', arguments);
};

Qq.div = function() {
    return Qq.binaryReduce('/', arguments);
};

Qq.remainder = function() {
    return Qq.binaryReduce('%', arguments);
};
