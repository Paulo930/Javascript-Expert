const assert = require('assert');

function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield 'Hello';
  yield '-';
  yield 'World';
  yield* calculation(20, 10);
}

const generator = main();
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generator.next(), { value: '-', done: false });
assert.deepStrictEqual(generator.next(), { value: 'World', done: false });
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 200]);
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200]);

// ---- async iterators
const { readFile, stat, readdir } = require('fs/promises');

function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve('Hey Dude');
}

Promise.all([...promisified()]).then((results) => {
  console.log('promisified', results);
});
// console.log('promisified', [...promisified()]);
