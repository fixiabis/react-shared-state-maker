import { useState, useEffect } from 'react';
import { Subject } from 'rxjs';

const makeSharedState = <State>(initialStateOrInitializer: State | (() => State)) => {
  const sharedStateSubject = new Subject<State>();

  let sharedState: State = typeof initialStateOrInitializer === 'function'
    ? (initialStateOrInitializer as () => State)()
    : initialStateOrInitializer;

  const setSharedState = (stateOrUpdater: State | ((prevState: State) => State)) => {
    const state = typeof stateOrUpdater === 'function'
      ? (stateOrUpdater as (prevState: State) => State)(sharedState)
      : stateOrUpdater;

    sharedStateSubject.next(sharedState = state);
  };

  const useSharedState = () => {
    const [state, setState] = useState<State>(sharedState);

    useEffect(() => {
      const subscriber = sharedStateSubject.subscribe(setState);
      return subscriber.unsubscribe.bind(subscriber);
    }, []);

    return [state, setSharedState] as [State, typeof setSharedState];
  };

  return useSharedState;
};

export default makeSharedState;
