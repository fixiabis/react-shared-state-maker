import { useState, useEffect } from 'react';
import { Subject } from 'rxjs';

type Initializer<State> = () => State;
type Updater<State> = (prevState: State) => State;
type Setter<State> = (stateOrUpdater: State | Updater<State>) => void;

const makeSharedState = <State>(
  initialStateOrInitializer: State | Initializer<State>
) => {
  const sharedStateSubject = new Subject<State>();

  let sharedState =
    typeof initialStateOrInitializer === 'function'
      ? (initialStateOrInitializer as Initializer<State>)()
      : initialStateOrInitializer;

  const setSharedState = (stateOrUpdater: State | Updater<State>) => {
    sharedState = sharedStateRef[0] =
      typeof stateOrUpdater === 'function'
        ? (stateOrUpdater as Updater<State>)(sharedState)
        : stateOrUpdater;

    sharedStateSubject.next(sharedState);
  };

  const useSharedState = () => {
    const [state, setState] = useState<State>(sharedState);

    useEffect(() => {
      const subscriber = sharedStateSubject.subscribe(setState);
      return subscriber.unsubscribe.bind(subscriber);
    }, []);

    return [state, setSharedState] as [State, Setter<State>];
  };

  const sharedStateRef = [sharedState, setSharedState] as [
    State,
    Setter<State>
  ];

  useSharedState.current = sharedStateRef;

  return useSharedState;
};

export default makeSharedState;
