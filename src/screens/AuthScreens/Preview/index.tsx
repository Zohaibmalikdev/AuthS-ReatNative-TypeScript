import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from 'react-redux';
//local
import styles from './styles';
import {Button, Header} from '../../../components';

//actions
import {registerUser} from '../../../store/actions/user';

import {IUser} from '../../../interface';

Icon.loadFont();

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  route: NavigationScreenProp<NavigationParams>;
  registerUser: (user: IUser) => void;
}

interface State {
  user: any;
  showPassword: boolean;
  passwordHidden: string;
}

const default_Img = require('../../../assets/default.png');

class Preview extends Component<Props, State> {
  state: State = {
    user: {} as IUser,
    showPassword: false,
    passwordHidden: '',
  };

  componentDidMount() {
    const {navigation} = this.props;
    const {user} = navigation.state.params;

    if (user) {
      let passwordHidden = '';
      //prepare password with *
      for (let i = 0; i < user.password.length; i++) {
        passwordHidden += '*';
      }
      this.setState({
        user: user,
        passwordHidden,
      });
    }
  }

  handleSubmit = (values: IUser) => {
    const {navigation} = this.props;
    /**
     * TODO
     *
     * freeze the values
     * user registered.
     * set the login credentials
     *
     *
     * push the user to users[] -> with id[name.tolowerCase()]
     */
  };

  render() {
    console.log(this.state, this.props);
    const {navigation, registerUser} = this.props;
    const {user} = this.state;
    console.log(user, 'user');

    return (
      <View style={styles.container}>
        <Header
          title="Preview"
          backButtonPress={() => navigation.goBack()}
          submitButtonPress={() => {
            /**
             * dispatch to register user
             * navigate to login screen.
             */
            registerUser(user);
            navigation.navigate('Login');
          }}
        />

        <View style={styles.contentContainer}>
          <Text style={styles.headText}>
            Please Ensure that entered Details are Correct...
          </Text>

          <View style={styles.lineBreake} />
          <Text style={styles.bodyText}>ID: {user.id}</Text>

          <View style={styles.lineBreake} />
          <Text style={styles.bodyText}>UserName: {user.username}</Text>
          <View style={styles.lineBreake} />
          <View style={styles.passwordContainer}>
            <Text style={styles.bodyText}>
              Password:{' '}
              {!this.state.showPassword
                ? this.state.passwordHidden
                : user.password}
            </Text>
            <View style={styles.iconContainer}>
              {!this.state.showPassword ? (
                <Icon
                  name="lock"
                  size={24}
                  onPress={() =>
                    this.setState({showPassword: !this.state.showPassword})
                  }
                />
              ) : (
                <Icon
                  name="lock-open"
                  size={24}
                  onPress={() =>
                    this.setState({showPassword: !this.state.showPassword})
                  }
                />
              )}
            </View>
          </View>

          <View style={styles.lineBreake} />
          <Text style={styles.bodyText}>Name: {user.name}</Text>
          <View style={styles.lineBreake} />
          <Text style={styles.bodyText}>Email: {user.email}</Text>
          <View style={styles.lineBreake} />
          <Text style={styles.bodyText}>Address: {user.address}</Text>
          <View style={styles.lineBreake} />
          <Text style={styles.bodyText}>PostCode: {user.postcode}</Text>
          <View style={styles.lineBreake} />
          <Text style={styles.bodyText}>City: {user.city}</Text>
          <View style={styles.lineBreake} />
          <Text style={styles.bodyText}>Country: {user.country}</Text>
          <View style={styles.lineBreake} />

          <Text style={styles.bodyText}>Uploaded Image: </Text>
          <View style={styles.AvatarContainer}>
            {user.images && user.images.length > 0 ? (
              user.images.map((img: string, index: number) => {
                return (
                  <Image
                    key={index}
                    style={{
                      width: 75,
                      height: 75,
                      margin: 5,
                    }}
                    source={{uri: img}}
                  />
                );
              })
            ) : (
              <Image style={{width: 75, height: 75}} source={default_Img} />
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default connect(null, {registerUser})(Preview);
