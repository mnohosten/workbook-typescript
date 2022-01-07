/**
 * Good articles about Generators
 * @see https://www.promisejs.org/generators/
 */

function* iteratesToFixedAmount(amount: number) {
  for (let i = 0; i < amount; i++) yield i;
}
describe('generator usage', () => {
  it('should generated iterator as expected', () => {
    let check = 0;
    for (const i of iteratesToFixedAmount(100)) {
      expect(i).toBe(check++);
    }
    expect(check).toBe(100);
  });

  it('should iterate also iterate in different way', () => {
    /**
     * - yields numbers
     * - returns strings
     * - can be passed in booleans
     */
    function* counter(): Generator<number, string, boolean> {
      let i = 0;
      while (true) {
        if (yield i++) {
          break;
        }
      }
      return 'done!';
    }

    const iter = counter();
    let curr = iter.next();
    let check = 0;

    while (!curr.done) {
      expect(curr.value).toBe(check++);
      curr = iter.next(curr.value >= 99);
    }
    expect(check).toBe(100);
    expect(curr.value.toUpperCase()).toBe('DONE!');
  });

  it('should generate all positive numbers', () => {
    function* count() {
      for (let x = 0; true; x++) yield x;
    }
    let a = 0;
    const LIMIT = 100000;
    for (const x of count()) {
      a = x;
      if (a > LIMIT) break;
    }
    expect(a).toBe(LIMIT + 1);
  });

  it('D1: https://www.promisejs.org/generators/', () => {
    function* demo() {
      yield 10;
      return 42;
    }

    const d = demo();
    expect(d.next().value).toBe(10);
    const result = d.next(32);
    expect(result.done).toBe(true);
  });
});
