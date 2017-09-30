const _ = require('ramda');

const inspect = function(x) {
  return (x && x.inspect) ? x.inspect() : x;
};

interface Functor<T> {
  map(f: (x: T) => T): Functor<T>;
  join?(): Functor<T> | any;
  chain?(x: (x: T) => T): any;
  ap?(x: any): Functor<T>;
  inspect?(): string;
}

export class Identity<T> implements Functor<T> {
  constructor(private __value) {}

  static of(x: any): Identity<any> {
    return new Identity(x);
  }

  map(f: (x: T) => T): Identity<T> {
    return Identity.of(f(this.__value));
  }
}

export class Maybe<T> implements Functor<T> {
  constructor(private __value) {}

  static of(x: any): Maybe<any> {
    return new Maybe(x);
  }

  private isNothing(): boolean {
    return (this.__value === null || this.__value === undefined);
  }

  map(f: (x: T) => T): Functor<T> {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
  }

  join(): Functor<T> {
    return this.isNothing() ? Maybe.of(null) : this.__value;
  }

  chain(f): any {
    return this.map(f).join();
  }

  ap(other): Functor<T> {
    return this.isNothing() ? Maybe.of(null) : other.map(this.__value);
  }

  inspect(): string {
    return 'Maybe(' + inspect(this.__value) + ')';
  }
}

export class Left<T> implements Functor<T> {
  constructor(private __value) {}

  static of(x): Left<any> {
    return new Left(x);
  }

  map(mapper: (x: T) => T): Functor<T> {return this; }
  join() {return this; }
  chain(x: (x: T) => T): any {return this; }
  ap(x: (x: T) => T): Functor<T> {return this; }

  inspect(): string {
    return 'Left(' + inspect(this.__value) + ')';
  }
}

export class Right<T> implements Functor<T> {
  constructor(private __value) {}

  static of(x): Right<any> {
    return new Right(x);
  }

  public map(f: (x: T) => T): Functor<T> {
    return Right.of(f(this.__value));
  }

  join(): T {
    return this.__value;
  }

  chain(f: (x: T) => T): any {
    return f(this.__value);
  }

  ap(other: any): Functor<T> {
    return this.chain(function(f) {
      return other.map(f);
    });
  }

  inspect(): string {
    return 'Right(' + inspect(this.__value) + ')';
  }
}

export class IO<T> implements Functor<T> {
  constructor(public unsafePerformIO: Function) {}
  static of(x): IO<any> {
    return new IO(() => x);
  }

  map(f: (x: T) => T): Functor<T> {
    return new IO(_.compose(f, this.unsafePerformIO));
  }

  join() {
    return this.unsafePerformIO();
  }

  chain(f: (x: T) => T) {
    return this.map(f).join();
  }

  ap(a: any): Functor<T> {
    return this.chain(function(f) {
      return a.map(f);
    });
  }

  inspect(): string {
    return 'IO(' + inspect(this.unsafePerformIO) + ')';
  }
}

export const unsafePerformIO = function(x) { return x.unsafePerformIO(); };

export const either = _.curry(function(f, g, e) {
  switch (e.constructor) {
    case Left: return f(e.__value);
    case Right: return g(e.__value);
  }
});

// overwriting join from pt 1
export const join = function(m) { return m.join(); };

export const chain = _.curry(function(f, m){
  return m.map(f).join(); // or compose(join, map(f))(m)
});

export const liftA2 = _.curry(function(f, a1, a2){
  return a1.map(f).ap(a2);
});

export const liftA3 = _.curry(function(f, a1, a2, a3){
  return a1.map(f).ap(a2).ap(a3);
});
