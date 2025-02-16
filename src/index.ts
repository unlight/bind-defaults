export function bindDefaults(originalFunction: Function, defaults: any) {
  const originalFunctionName = originalFunction.name;
  const boundFunction = function (this: unknown, options: any, ...args: any) {
    const mergedOptions = Object.assign({}, defaults, options);

    return originalFunction.call(this, mergedOptions, ...args);
  };

  Object.defineProperty(boundFunction, 'name', { value: originalFunctionName });

  return boundFunction;
}

// type BoundFunc<F extends (options: Options, ...args: any[]) => any> = F & {
//   defaults: Options;
//   bindDefaults: (newDefaults: Options) => BoundFunc<F>;
//   [isBoundFuncSymbol]: true;
//   [originalFuncSymbol]: F;
// };

// const isBoundFuncSymbol = Symbol('isBoundFunc');
// const originalFuncSymbol = Symbol('originalFunc');

// function bindWithDefaults<F extends (options: Options, ...args: any[]) => any>(
//   func: F,
//   defaults: Options = {},
// ): BoundFunc<F> {
//   let originalFunc: F = func;
//   let existingDefaults: Options = {};

//   if (typeof func === 'function' && (func as any)[isBoundFuncSymbol]) {
//     existingDefaults = (func as BoundFunc<F>).defaults;
//     originalFunc = (func as BoundFunc<F>)[originalFuncSymbol];
//   }

//   const mergedDefaults = { ...existingDefaults, ...defaults };

//   const boundFunc = ((options: Options = {}, ...args: any[]) => {
//     return originalFunc({ ...mergedDefaults, ...options }, ...args);
//   }) as BoundFunc<F>;

//   Object.defineProperties(boundFunc, {
//     [isBoundFuncSymbol]: { value: true, enumerable: false },
//     defaults: { value: mergedDefaults, enumerable: false },
//     [originalFuncSymbol]: { value: originalFunc, enumerable: false },
//     bindDefaults: {
//       value: (newDefaults: Options) => bindWithDefaults(boundFunc, newDefaults),
//       enumerable: false,
//     },
//   });

//   return boundFunc;
// }

// export { bindWithDefaults, isBoundFuncSymbol, originalFuncSymbol };

// type Options = Record<string, unknown>;
