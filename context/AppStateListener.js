
import { useEffect, useRef } from 'react';
import { AppState, Alert } from 'react-native';

export default function AppStateListener() {
  const previousState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextState) => {
        if (
          (previousState.current === 'background' ||
            previousState.current === 'inactive') &&
          nextState === 'active'
        ) {
          Alert.alert(
            'Welcome Back!',
            'You are back in KitchenKeeper.'
          );
        }

        previousState.current = nextState;
      }
    );

    return () => subscription.remove();
  }, []);

  return null;
}

