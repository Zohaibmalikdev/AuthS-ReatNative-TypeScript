import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

class ALoading extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const {navigation} = this.props;
    const userToken = await AsyncStorage.getItem('userToken');
    navigation.navigate(userToken ? 'AppStack' : 'AuthStack');
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default ALoading;
