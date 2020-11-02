# react-shared-state-maker

react hook for share state between the components without use context api.

# Attention

The stable version is 1.3.x, earlier versions are not available.

# Example: make shared state between the components

Make shared state hook in `useSharedState.ts` / `useSharedState.js`:

```javascript
import { makeSharedState } from 'react-shared-state-maker';

const useSharedState = makeSharedState('');

export default useSharedState;
```

Put in `ComponentA.tsx` / `ComponentA.js`:

```jsx
import React from 'react';
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
import React from 'react';
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
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

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

# Example: set shared state out of component

Refer to [previous section](#example-make-shared-state-between-the-components), ComponentA, ComponentB and useSharedState are prepared.

```jsx
import React from 'react';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
import useSharedState from './useSharedState';

const [, setValue] = useSharedState.current;
const clearContent = () => setValue(''); // will re-render only components of shared state

const App = () => {
  return (
    <>
      <ComponentA />
      <ComponentB />
      <input type="button" value="clear" onClick={clearContent}>
    </>
  );
};

export default App;
```
