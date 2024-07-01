/* Trying to implement/understand monads with TS

    - The simplest example might be maybe/option monad
    - It is basically composed of three parts
     1. A monad type
     2. A wrapper -> takes a value and returns the Option Type
     3. A lambda -> takes a wrapped value and a transformer
        Applies the transformer if option is fine (safely)
 */

interface None {
  tag: "None";
}

interface Some<T> {
  tag: "Some";
  value: T;
}

type Option<T> = Some<T> | None;

const some = <T>(value: T): Option<T> => ({
  tag: "Some",
  value,
});

const none = (): None => ({ tag: "None" });

const optionWrapper = (v: any) => {
  if (v === undefined) {
    return none();
  }

  return some(v);
};

const run = <T>(
  x: Option<T>,
  transform: (_: Option<T>) => Option<T>
): Option<T> => {
  if (x === none()) {
    return none();
  }

  return transform(x);
};

const v = some(1);

console.log(run(v, (v) => some(v.value + 1)));
