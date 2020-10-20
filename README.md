# react-shared-state-hook

react hook for share state between components

# Example: make shared state between components

Make shared state hook in `useSharedState.ts` / `useSharedState.js`:

```javascript
import { makeSharedState } from 'react-shared-state-hook';

const useSharedState = makeSharedState('');

export default useSharedState;
```

Put in `ComponentA.tsx` / `ComponentA.js`:

```jsx
import useSharedState from './useSharedState';

const ComponentA = () => {
  const [value, setValue] = useSharedState();

  return (
    <input
      value={value}
      onChange={({ target: { value } }) => setValue(value)}
    />
  );
};

export default ComponentA;
```

And put in `ComponentB.tsx` / `ComponentB.js`:

```jsx
import useSharedState from './useSharedState';

const ComponentB = () => {
  const [value, setValue] = useSharedState();

  return (
    <input
      value={value}
      onChange={({ target: { value } }) => setValue(value)}
    />
  );
};

export default ComponentB;
```

Now, put ComponentA and ComponentB in `App.tsx` / `App.js`, let's all!

```jsx
import React from 'react';
import ComponentA from './componentA';
import ComponentB from './componentB';

const App = () => {
  return (
    <>
      <ComponentA />
      <ComponentB />
    </>
  );
};

export default App;
```
