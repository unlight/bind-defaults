import { expect, it } from 'vitest';

import { bindDefaults } from './index';

it('first bind', () => {
  const testFunction = ({ a }: { a?: string }) => a;
  const boundFunction = bindDefaults(testFunction, { a: 'A' });
  const result = boundFunction.call(null, {});
  expect(result).toEqual('A');
  expect(boundFunction.name).toEqual('testFunction');
});

it('first bind with call', () => {
  const testFunction = ({ a }: { a: string }) => a;
  const boundFunction = bindDefaults(testFunction, { a: 'A' });
  const result = boundFunction({ a: 'Bound A' });
  expect(result).toEqual('Bound A');
});

it('second bind', () => {
  const testFunction = ({ a, b }: { a: string; b: string }) => ({ a, b });
  const boundFunction1 = bindDefaults(testFunction, { a: 'A' });
  const boundFunction2 = bindDefaults(boundFunction1, { b: 'B' });
  const result = boundFunction2({});
  expect(result).toEqual({ a: 'A', b: 'B' });
});

it('triple bind', () => {
  const testFunction = ({
    a,
    b,
    c,
  }: {
    a?: string;
    b?: string;
    c?: string;
  }) => ({ a, b, c });
  const boundFunction1 = bindDefaults(testFunction, { a: 'A' });
  const boundFunction2 = bindDefaults(boundFunction1, { b: 'B' });
  const boundFunction3 = bindDefaults(boundFunction2, { a: 'A3', c: '3' });
  const result = boundFunction3({});
  expect(result).toEqual({ a: 'A3', b: 'B', c: '3' });
});

// it.skip('class methods', () => {
//   class API {
//     @bindDefaults({ format: 'json' })
//     fetch(options: { endpoint: string; format: string }) {
//       /* ... */
//     }
//   }
// });
