/* Trying to implement/understand monads with TS

    - The simplest example might be maybe/option monad
    - It is basically composed of three parts
     1. A monad type
     2. A wrapper -> takes a value and returns the Option Type
     3. A lambda -> takes a wrapped value and a transformer
        Applies the transformer if option is fine (safely)
 */

// The option type: it may contain a value
export type Option<T> = { _tag: "Some"; value: T } | { _tag: "None" };

export const Maybe = {
  Some: <T>(value: T): Option<T> => {
    return {
      _tag: "Some",
      value,
    };
  },
  None: <T>(): Option<T> => {
    return {
      _tag: "None",
    };
  },
  Bind: <T>(monad: Option<T>, transform: (op: T) => Option<T>): Option<T> => {
    if (monad._tag === "None") {
      return monad;
    }

    return transform(monad.value);
  },
};

export type SecondOption<T> =
  | {
      _tag: "Some";
      value: T;
      bind: (fn: (monad: T) => T) => SecondOption<T>;
    }
  | {
      _tag: "None";
      bind: (fn: (monad: T) => T) => SecondOption<T>;
    };

export const Some = <T>(value: T): SecondOption<T> => {
  return {
    _tag: "Some",
    value,
    bind: (fn) => {
      try {
        const transformed = fn(value);
        return Some(transformed);
      } catch (e) {
        return None();
      }
    },
  };
};

export const None = <T>(): SecondOption<T> => {
  return {
    _tag: "None",
    bind: () => {
      return None();
    },
  };
};
