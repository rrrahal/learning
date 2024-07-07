import { Maybe, Option, Some } from "./option-monad";

const addOne = (op: number): Option<number> => {
  return Maybe.Some(op + 1);
};

const myMonad = Maybe.Some(5);

console.log(Maybe.Bind(myMonad, addOne));

const addTwo = (v: number): number | never => {
  if (v >= 0) {
    return v + 2;
  }
  throw new Error("Cannot add negative number");
};

const otherMonad = Some(3);
console.log(otherMonad.bind(addTwo).bind(addTwo));

const errorMonad = Some(-1);
console.log(errorMonad.bind(addTwo).bind(addTwo));
