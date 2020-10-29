# react-shared-state-maker

react hook for share state between the components without use context api.

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

# Example: set shared state without use hook

Refer to [previous section](#example-make-shared-state-between-the-components), ComponentA, ComponentB and useSharedState are prepared.

```jsx
import React from 'react';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
import useSharedState from './useSharedState';

const App = () => {
  const [, setValue] = useSharedState.current; // not hooked state and dispatcher
  const clearContent = () => setValue(''); // No re-render on App

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
