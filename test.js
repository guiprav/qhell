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

let Qh = require('.');
let Q = require('q');

let chai = require('chai');
let expect = chai.expect;

chai.should();

describe('deepWhen', () => {
    describe('called with no parameters', () => {
        it('should return promise to undefined', done => {
            Qh.deepWhen().then(result => {
                expect(result).to.be.undefined;
                done();
            }).done();
        });
    });

    describe('called with a value parameter', () => {
        describe('that is not a promise', () => {
            it('should return promise to that value', done => {
                Qh.deepWhen(123).then(result => {
                    result.should.equal(123);
                    done();
                }).done();
            });
        });

        describe('that is a promise', () => {
            it('should return an equivalent promise', done => {
                Qh.deepWhen(Q.when(123)).then(result => {
                    result.should.equal(123);
                    done();
                }).done();
            });
        });

        describe('that is undefined', () => {
            it('should return promise to undefined', done => {
                Qh.deepWhen(undefined).then(result => {
                    expect(result).to.equal(undefined);
                    done();
                }).done();
            });
        });

        describe('that is promise to undefined', () => {
            it('should return promise to undefined', done => {
                Qh.deepWhen(Q.when(undefined)).then(result => {
                    expect(result).to.equal(undefined);
                    done();
                }).done();
            });
        });

        describe('that is null', () => {
            it('should return promise to null', done => {
                Qh.deepWhen(null).then(result => {
                    expect(result).to.equal(null);
                    done();
                }).done();
            });
        });

        describe('that is promise to null', () => {
            it('should return promise to null', done => {
                Qh.deepWhen(Q.when(null)).then(result => {
                    expect(result).to.equal(null);
                    done();
                }).done();
            });
        });
    });

    describe('called with an array as parameter', () => {
        describe('containing a single value', () => {
            describe('that is not a promise', () => {
                it('should return promise to an equivalent array', done => {
                    Qh.deepWhen([123]).then(result => {
                        result.should.deep.equal([123]);
                        done();
                    }).done();
                });
            });

            describe('that is a promise', () => {
                it('should return promise to an equivalent, fully-resolved array', done => {
                    Qh.deepWhen([Q.when(123)]).then(result => {
                        result.should.deep.equal([123]);
                        done();
                    }).done();
                });
            });

            describe('that is undefined', () => {
                it('should return promise to an equivalent, fully-resolved array', done => {
                    Qh.deepWhen([undefined]).then(result => {
                        expect(result).to.deep.equal([undefined]);
                        done();
                    }).done();
                });
            });

            describe('that is promise to undefined', () => {
                it('should return promise to an equivalent, fully-resolved array', done => {
                    Qh.deepWhen([Q.when(undefined)]).then(result => {
                        expect(result).to.deep.equal([undefined]);
                        done();
                    }).done();
                });
            });

            describe('that is null', () => {
                it('should return promise to an equivalent, fully-resolved array', done => {
                    Qh.deepWhen([null]).then(result => {
                        expect(result).to.deep.equal([null]);
                        done();
                    }).done();
                });
            });

            describe('that is promise to null', () => {
                it('should return promise to an equivalent, fully-resolved array', done => {
                    Qh.deepWhen([Q.when(null)]).then(result => {
                        expect(result).to.deep.equal([null]);
                        done();
                    }).done();
                });
            });
        });

        describe('containing multiple values', () => {
            describe('where none of the values is a promise', () => {
                it('should return promise to an equivalent array', done => {
                    Qh.deepWhen([1, 2, 3]).then(result => {
                        result.should.deep.equal([1, 2, 3]);
                        done();
                    }).done();
                });
            });

            describe('where some of the values are promises', () => {
                it('should return promise to an equivalent, fully-resolved array', done => {
                    Qh.deepWhen([1, Q.when(2), 3, Q.when(4)]).then(result => {
                        result.should.deep.equal([1, 2, 3, 4]);
                        done();
                    }).done();
                });
            });
        });
    });

    describe('called with a promise to array as parameter', () => {
        describe('where the array contains a single parameter', () => {
            describe('that is not a promise', () => {
                it('should return promise to an equivalent array', done => {
                    Qh.deepWhen(Q.when([123])).then(result => {
                        result.should.deep.equal([123]);
                        done();
                    }).done();
                });
            });

            describe('that is a promise', () => {
                it('should return promise to an equivalent, fully-resolved array', done => {
                    Qh.deepWhen(Q.when([Q.when(123)])).then(result => {
                        result.should.deep.equal([123]);
                        done();
                    }).done();
                });
            });
        });

        describe('where the array contains multiple values', () => {
            describe('where none of the values is a promise', () => {
                it('should return promise to an equivalent array', done => {
                    Qh.deepWhen(Q.when([1, 2, 3])).then(result => {
                        result.should.deep.equal([1, 2, 3]);
                        done();
                    }).done();
                });
            });

            describe('where some of the values are promises', () => {
                it('should return promise to an equivalent, fully-resolved array', done => {
                    Qh.deepWhen(Q.when([
                        1, Q.when(2), 3, Q.when(4)
                    ])).then(result => {
                        result.should.deep.equal([1, 2, 3, 4]);
                        done();
                    }).done();
                });
            });
        });
    });

    describe('called with an object as parameter', () => {
        describe('containing a single property', () => {
            describe('whose value is not a promise', () => {
                it('should return promise to an equivalent object', done => {
                    Qh.deepWhen({ a: 123 }).then(result => {
                        result.should.deep.equal({ a: 123 });
                        done();
                    }).done();
                });
            });

            describe('whose value is a promise', () => {
                it('should return promise to an equivalent, fully-resolved object', done => {
                    Qh.deepWhen({ a: Q.when(123) }).then(result => {
                        result.should.deep.equal({ a: 123 });
                        done();
                    }).done();
                });
            });

            describe('whose value is undefined', () => {
                it('should return promise to an equivalent, fully-resolved array', done => {
                    Qh.deepWhen({ a: undefined }).then(result => {
                        expect(result).to.deep.equal({ a: undefined });
                        done();
                    }).done();
                });
            });

            describe('whose value is promise to undefined', () => {
                it('should return promise to an equivalent, fully-resolved array', done => {
                    Qh.deepWhen({ a: Q.when(undefined) }).then(result => {
                        expect(result).to.deep.equal({ a: undefined });
                        done();
                    }).done();
                });
            });

            describe('whose value is null', () => {
                it('should return promise to an equivalent, fully-resolved array', done => {
                    Qh.deepWhen({ a: null }).then(result => {
                        expect(result).to.deep.equal({ a: null });
                        done();
                    }).done();
                });
            });

            describe('whose value is promise to null', () => {
                it('should return promise to an equivalent, fully-resolved array', done => {
                    Qh.deepWhen({ a: Q.when(null) }).then(result => {
                        expect(result).to.deep.equal({ a: null });
                        done();
                    }).done();
                });
            });
        });

        describe('containing multiple properties', () => {
            describe('where none of the property values is a promise', () => {
                it('should return promise to an equivalent object', done => {
                    Qh.deepWhen({ a: 1, b: 2 }).then(result => {
                        result.should.deep.equal({ a: 1, b: 2 });
                        done();
                    }).done();
                });
            });

            describe('where some of the property values are promises', () => {
                it('should return promise to an equivalent, fully-resolved object', done => {
                    Qh.deepWhen({
                        a: 1, b: Q.when(2), c: 3, d: Q.when(4)
                    }).then(result => {
                        result.should.deep.equal({
                            a: 1, b: 2, c: 3, d: 4
                        });
                        done();
                    }).done();
                });
            });
        });
    });

    describe('called with a promise to object as parameter', () => {
        describe('where the object contains a single property', () => {
            describe('whose value is not a promise', () => {
                it('should return promise to an equivalent object', done => {
                    Qh.deepWhen(Q.when({ a: 123 })).then(result => {
                        result.should.deep.equal({ a: 123 });
                        done();
                    }).done();
                });
            });

            describe('whose value is a promise', () => {
                it('should return promise to an equivalent, fully-resolved object', done => {
                    Qh.deepWhen(Q.when({ a: Q.when(123) })).then(result => {
                        result.should.deep.equal({ a: 123 });
                        done();
                    }).done();
                });
            });
        });

        describe('where the object contains multiple properties', () => {
            describe('where none of the property values is a promise', () => {
                it('should return promise to an equivalent object', done => {
                    Qh.deepWhen(Q.when({ a: 1, b: 2 })).then(result => {
                        result.should.deep.equal({ a: 1, b: 2 });
                        done();
                    }).done();
                });
            });

            describe('where some of the property values are promises', () => {
                it('should return promise to an equivalent, fully-resolved object', done => {
                    Qh.deepWhen(Q.when({
                        a: 1, b: Q.when(2), c: 3, d: Q.when(4)
                    })).then(result => {
                        result.should.deep.equal({
                            a: 1, b: 2, c: 3, d: 4
                        });
                        done();
                    }).done();
                });
            });
        });
    });

    describe('called with a complex JavaScript structure', () => {
        describe('where none of the values are promises', () => {
            it('should return promise to an equivalent structure', done => {
                Qh.deepWhen({
                    a: 123,
                    b: 234,
                    c: [123],
                    d: [123],
                    e: [1, 2, 3],
                    f: [1, 2, 3, 4],
                    g: [123],
                    h: [123],
                    i: [1, 2, 3],
                    j: [1, 2, 3, 4],
                    k: { a: 123 },
                    l: { a: 123 },
                    m: { a: 1, b: 2, c: 3 },
                    n: { a: 1, b: 2, c: 3, d: 4 },
                    o: { a: 123 },
                    p: { a: 123 },
                    q: { a: 1, b: 2, c: 3 },
                    r: { a: 1, b: 2, c: 3, d: 4 },
                    s: [[123]],
                    t: [[123]],
                    u: [1, [[[2, 3], 4]]],
                    v: { a: 1, b: [[[2, 3], 4]] },
                    w: {
                        a: 1,
                        b: [[[2, 3], 4]],
                        c: [1, [[[2, 3], 4]]],
                    },
                    x: {
                        a: 1,
                        b: { a: 1, b: [[[2, 3], 4]] },
                        c: [[[2, 3], 4]],
                    },
                    y: [
                        1, {
                            a: 1,
                            b: [[[2, 3], 4]],
                            c: [1, [[[2, 3], 4]]],
                        },
                        2, {
                            a: 1,
                            b: { a: 1, b: [[[2, 3], 4]] },
                            c: [[[2, 3], 4]],
                        }
                    ],
                    z: [
                        undefined, 1, null, 2, {
                            a: undefined, b: null
                        },
                    ],
                }).then(result => {
                    result.should.deep.equal({
                        a: 123,
                        b: 234,
                        c: [123],
                        d: [123],
                        e: [1, 2, 3],
                        f: [1, 2, 3, 4],
                        g: [123],
                        h: [123],
                        i: [1, 2, 3],
                        j: [1, 2, 3, 4],
                        k: { a: 123 },
                        l: { a: 123 },
                        m: { a: 1, b: 2, c: 3 },
                        n: { a: 1, b: 2, c: 3, d: 4 },
                        o: { a: 123 },
                        p: { a: 123 },
                        q: { a: 1, b: 2, c: 3 },
                        r: { a: 1, b: 2, c: 3, d: 4 },
                        s: [[123]],
                        t: [[123]],
                        u: [1, [[[2, 3], 4]]],
                        v: { a: 1, b: [[[2, 3], 4]] },
                        w: {
                            a: 1,
                            b: [[[2, 3], 4]],
                            c: [1, [[[2, 3], 4]]],
                        },
                        x: {
                            a: 1,
                            b: { a: 1, b: [[[2, 3], 4]] },
                            c: [[[2, 3], 4]],
                        },
                        y: [
                            1, {
                                a: 1,
                                b: [[[2, 3], 4]],
                                c: [1, [[[2, 3], 4]]],
                            },
                            2, {
                                a: 1,
                                b: { a: 1, b: [[[2, 3], 4]] },
                                c: [[[2, 3], 4]],
                            }
                        ],
                        z: [
                            undefined, 1, null, 2, {
                                a: undefined, b: null
                            },
                        ],
                    });

                    done();
                }).done();
            });
        });

        describe('where some of the values are promises', () => {
            it('should return promise to an equivalent structure', done => {
                Qh.deepWhen({
                    a: 123,
                    b: Q.when(234),
                    c: [123],
                    d: [Q.when(123)],
                    e: [1, 2, 3],
                    f: [1, Q.when(2), 3, Q.when(4)],
                    g: Q.when([123]),
                    h: Q.when([Q.when(123)]),
                    i: Q.when([1, 2, 3]),
                    j: Q.when([1, Q.when(2), 3, Q.when(4)]),
                    k: { a: 123 },
                    l: { a: Q.when(123) },
                    m: { a: 1, b: 2, c: 3 },
                    n: { a: 1, b: Q.when(2), c: 3, d: Q.when(4) },
                    o: Q.when({ a: 123 }),
                    p: Q.when({ a: Q.when(123) }),
                    q: Q.when({ a: 1, b: 2, c: 3 }),
                    r: Q.when({ a: 1, b: Q.when(2), c: 3, d: Q.when(4) }),
                    s: [[123]],
                    t: [[Q.when(123)]],
                    u: [1, [Q.when([Q.when([2, 3]), 4])]],
                    v: { a: 1, b: [Q.when([Q.when([2, 3]), 4])] },
                    w: {
                        a: 1,
                        b: [Q.when([Q.when([2, 3]), 4])],
                        c: [1, [Q.when([Q.when([2, 3]), 4])]],
                    },
                    x: {
                        a: 1,
                        b: { a: 1, b: [Q.when([Q.when([2, 3]), 4])] },
                        c: [Q.when([Q.when([2, 3]), 4])],
                    },
                    y: [
                        1, {
                            a: 1,
                            b: [Q.when([Q.when([2, 3]), 4])],
                            c: [1, [Q.when([Q.when([2, 3]), 4])]],
                        },
                        2, {
                            a: 1,
                            b: { a: 1, b: [Q.when([Q.when([2, 3]), 4])] },
                            c: [Q.when([Q.when([2, 3]), 4])],
                        }
                    ],
                    z: [
                        undefined, 1, null, 2, {
                            a: Q.when(undefined), b: Q.when(null)
                        },
                    ],
                }).then(result => {
                    result.should.deep.equal({
                        a: 123,
                        b: 234,
                        c: [123],
                        d: [123],
                        e: [1, 2, 3],
                        f: [1, 2, 3, 4],
                        g: [123],
                        h: [123],
                        i: [1, 2, 3],
                        j: [1, 2, 3, 4],
                        k: { a: 123 },
                        l: { a: 123 },
                        m: { a: 1, b: 2, c: 3 },
                        n: { a: 1, b: 2, c: 3, d: 4 },
                        o: { a: 123 },
                        p: { a: 123 },
                        q: { a: 1, b: 2, c: 3 },
                        r: { a: 1, b: 2, c: 3, d: 4 },
                        s: [[123]],
                        t: [[123]],
                        u: [1, [[[2, 3], 4]]],
                        v: { a: 1, b: [[[2, 3], 4]] },
                        w: {
                            a: 1,
                            b: [[[2, 3], 4]],
                            c: [1, [[[2, 3], 4]]],
                        },
                        x: {
                            a: 1,
                            b: { a: 1, b: [[[2, 3], 4]] },
                            c: [[[2, 3], 4]],
                        },
                        y: [
                            1, {
                                a: 1,
                                b: [[[2, 3], 4]],
                                c: [1, [[[2, 3], 4]]],
                            },
                            2, {
                                a: 1,
                                b: { a: 1, b: [[[2, 3], 4]] },
                                c: [[[2, 3], 4]],
                            }
                        ],
                        z: [
                            undefined, 1, null, 2, {
                                a: undefined, b: null
                            },
                        ],
                    });

                    done();
                }).done();
            });
        });
    });
});
