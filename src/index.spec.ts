import { describe, expect, it } from 'vitest';
import { bindDefaults } from './index';

it('first bind', () => {
  const fn = ({ a }) => a;
  const boundFunction = bindDefaults(fn, { a: 'A' });
  const result = boundFunction.apply(null, [] as any);
  expect(result).toEqual('A');
});
