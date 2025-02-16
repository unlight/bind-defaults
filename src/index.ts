type FirstParameter<T extends (...args: any[]) => any> = Parameters<T>[0];
type TailParameters<T extends (...args: any[]) => any> = T extends (
  first: any,
  ...rest: infer Rest
) => any
  ? Rest
  : never;

export function bindDefaults<
  F extends (
    options: FirstParameter<F>,
    ...args: TailParameters<F>
  ) => ReturnType<F>,
>(originalFunction: F, defaults: Partial<FirstParameter<F>>) {
  const originalFunctionName = originalFunction.name;
  const boundFunction = function (
    this: unknown,
    options: Partial<FirstParameter<F>>,
    ...args: TailParameters<F>
  ) {
    const mergedOptions = Object.assign(
      {},
      defaults,
      options,
    ) as FirstParameter<F>;

    return originalFunction.call(this, mergedOptions, ...args);
  };

  Object.defineProperty(boundFunction, 'name', { value: originalFunctionName });

  return boundFunction;
}
