/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import AppContainer from './navigation/AppContainer';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={configureStore().store}>
        <PersistGate loading={null} persistor={configureStore().persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
