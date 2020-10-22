import { useState, useEffect } from 'react';
import { Subject } from 'rxjs';

const makeSharedState = <State>(initialState: State) => {
  const sharedState = new Subject<State>();
  const setSharedState = sharedState.next.bind(sharedState);

  const useSharedState = () => {
    const [state, setState] = useState<State>(initialState);

    useEffect(() => {
      const subscriber = sharedState.subscribe(setState);
      return subscriber.unsubscribe.bind(subscriber);
    }, []);

    return [state, setSharedState] as [State, typeof setSharedState];
  };

  return useSharedState;
};

export default makeSharedState;
