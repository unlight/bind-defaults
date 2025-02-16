# bind-defaults

A utility for enhancing functions by binding default values to their first parameter.
It's perfect for simplifying APIs, reducing boilerplate code, and ensuring consistent configurations across function calls.

## Features

- **Default Binding**: Bind default values to the first parameter of a function.
- **Option Merging**: Automatically merge user-provided options with defaults using `Object.assign`.
- **Function Identity**: Preserves the original function's name for better debugging.
- **Context preservation** through proper `this` handling
- **TypeScript-Friendly**: Built with TypeScript in mind, providing full type inference and safety.
- **Lightweight**: Zero dependencies and minimal overhead.

## Installation

```bash
npm install bind-defaults
# or
yarn add bind-defaults
```

## API Documentation

#### `bindDefaults<F>(originalFunction: F, defaults: FirstParameter<F>)`

- **`originalFunction`**: The function to which defaults will be bound.
- **`defaults`**: An object containing default values for the first parameter of `originalFunction`.
- **Returns**: A new function with the defaults bound to its first parameter.

## Usage

```typescript
import { bindDefaults } from 'bind-defaults';

// Example function
function createUser(options: {
  name: string;
  age?: number;
  isAdmin?: boolean;
}) {
  console.log('Creating user with options:', options);
}

// Bind defaults
const createUserWithDefaults = bindDefaults(createUser, {
  age: 25,
  isAdmin: false,
});

// Call the bound function
createUserWithDefaults({ name: 'Alice' });
// Output: Creating user with options: { name: 'Alice', age: 25, isAdmin: false }
```

## Similar projects

- https://github.com/sgtlambda/merge-bind
- https://github.com/balderdashy/merge-context

## License

[MIT License](https://opensource.org/licenses/MIT) (c) 2025
