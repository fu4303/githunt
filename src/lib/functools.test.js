import { prefetch } from './functools';

test('functools.prefetch', async () => {
  let testObj = {a: 1, b: 2, c: 3}
  let sumCallTimes = 0;
  let result;

  function sum(...ks) {
    sumCallTimes++;
    return ks.map(k => testObj[k]).reduce((x, y) => x + y, 0);
  }

  expect(sum()).toBe(0);
  expect(sum('a')).toBe(1);
  expect(sum('a', 'c')).toBe(4);
  expect(sum('a', 'b', 'c')).toBe(6);

  expect(sumCallTimes).toBe(4);

  const prefetched = prefetch(sum, 'b', 'c');
  expect(sumCallTimes).toBe(5);

  // fetching without cache is not affected
  result = prefetched('a', 'b')
  expect(sumCallTimes).toBe(6);
  expect(result).toBe(3);

  // test prefetched OK
  testObj.c = 3.1;
  result = prefetched('b', 'c');
  expect(sumCallTimes).toBe(6);
  expect(result).toBe(5);

  // test cache is used only one time
  result = prefetched('b', 'c');
  expect(sumCallTimes).toBe(7);
  expect(result).toBe(5.1);
})
