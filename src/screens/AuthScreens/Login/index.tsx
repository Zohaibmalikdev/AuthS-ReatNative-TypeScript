import React, {Component} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//local
import {loginUserService, loginUser} from '../../../store/actions/user';
import {Input, Button} from '../../../components';
import styles from './styles';

//schema
import {loginSchema} from '../../../schemas';

Icon.loadFont();

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  user: any;
  loginUser: (userToken: string) => void;
}
interface userData {
  username: string;
  password: string;
}

class Login extends Component<Props, {}> {
  handleLogin = (values: userData) => {
    const {navigation, user, loginUser} = this.props;

    //check if user is registered ?
    if (user.username.trim() === '' && user.password.trim() === '') {
      return Alert.alert('It seems like you are not Register Yet.');
    }

    //check if user credentials are correct.
    //to mock api response
    if (
      values.username !== user.username ||
      values.password !== user.password
    ) {
      //reject if didn;t match
      return Alert.alert('Invalid User');
    }

    //create a token
    let userToken = `${values.username}${values.password}`;
    //dispatch login
    loginUser(userToken);
    //set async storage
    loginUserService(userToken).then(() => {
      //navigate
      navigation.navigate('AppStack');
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView bounces={false}>
            <Formik
              initialValues={{username: '', password: ''}}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}>
              {({
                values,
                handleChange,
                handleBlur,
                touched,
                handleSubmit,
                errors,
              }) => {
                return (
                  <View>
                    <View style={styles.headStyle}>
                      <Icon name="emotsmile" size={100} />
                      <Text style={styles.headText}>Let's Build</Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <Input
                        placeholder="Username"
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        error={touched.username && errors.username}
                      />
                      <Text>{errors['username']}</Text>
                      <Input
                        placeholder="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry
                        error={touched.password && errors.password}
                      />
                      <Text>{errors['password']}</Text>
                      <Button text="Login" onPress={handleSubmit} />
                      <View style={styles.signupView}>
                        <Text>Not Register yet? </Text>
                        <Button
                          text="Register"
                          onPress={() =>
                            this.props.navigation.navigate('Register')
                          }
                        />
                      </View>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {loginUser})(Login);
