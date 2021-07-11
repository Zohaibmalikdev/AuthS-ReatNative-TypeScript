import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native'

//root reducer
import rootReducer from './reducers/rootReducer';

const key = 'React-Native';

//presist config
const persistConfig = {
  key: key,
  storage: AsyncStorage,
};

if (__DEV__) {
  NativeModules.DevSettings.setIsDebuggingRemotely(true);
}

//handle the localstorage bind with rootReducers

export default function configureStore() {
  const composeEnhancers = compose(
    applyMiddleware(thunk, logger),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  );
  const pReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(pReducer, composeEnhancers);
  const persistor = persistStore(store);

  return {store, persistor};
}
