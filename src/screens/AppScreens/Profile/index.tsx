import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

//local
import {Header, Input, Button} from '../../../components';
import styles from './styles';
import {colors} from '../../../layout/colors';
//action
import {
  updateUser,
  logoutUserService,
  logoutUser,
} from '../../../store/actions/user';

//interface
import {IUser} from '../../../interface';
//schema 
import {registerSchema} from '../../../schemas';

Icon.loadFont();

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  updateUser: (user: IUser) => void;
  logoutUser: () => void;
}

interface State {
  isUpdatable: boolean;
  user: IUser;
  images: string[];
}

class Profile extends Component<Props, State> {
  state: State = {
    isUpdatable: false,
    user: this.props.user,
    images: [],
  };

  editPictureHandler = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
      forceJpg: true,
      multiple: true,
      writeTempFile: true,
      minFiles: 1,
      maxFiles: 2,
      showsSelectedCount: true,
    }).then(image => {
      console.log(image, 'image');
      if (Array.isArray(image)) {
        let images: string[] = [];
        //loop iamge and get path
        image.forEach(img => images.push(img.path));

        this.setState({
          images: images,
          isUpdatable: true,
        });
      }
    });
  };

  handleUpdate = (values: IUser) => {
    const {updateUser} = this.props;
    this.setState(
      {
        isUpdatable: false,
      },
      () => {
        if (this.state.images.length === 0) {
          values.images = this.state.user.images;
        } else {
          values.images = this.state.images;
        }
        updateUser(values);
      },
    );
  };

  handleFocus = () => {
    if (!this.state.isUpdatable) {
      this.setState({isUpdatable: true});
    }
  };

  handleLogout = () => {
    const {navigation, logoutUser} = this.props;
    logoutUser();

    logoutUserService().then(() => {
      navigation.navigate('AuthStack');
    });
  };

  render() {
    const {navigation} = this.props;
    const {user, isUpdatable} = this.state;
    if(this.props.user === undefined){
      this.handleLogout();
    }
    return (
      <View style={styles.container}>
        <Header
          title="Profile"
          backButtonPress={() => navigation.goBack()}
          logoutButtonPress={() => this.handleLogout()}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView bounces={false}>
            <Formik
              initialValues={{
                id: user.id,
                username: user.username,
                password: user.password,
                name: user.name,
                address: user.address,
                postcode: user.postcode,
                city: user.city,
                country: user.country,
                email: user.email,
              }}
              validationSchema={registerSchema}
              onSubmit={values => {
                this.handleUpdate(values);
              }}>
              {({
                values,
                handleChange,
                handleBlur,
                touched,
                handleSubmit,
                errors,
              }) => {
                return (
                  <View style={styles.inputContainer}>
                    <ScrollView contentContainerStyle={styles.contentStyle}>
                      <Text onPress={() => Alert.alert('Not Editable')}>
                        User ID: {user.id}
                      </Text>
                      <View style={styles.lineBreak} />
                      <Input
                        placeholder="Username"
                        editable={false}
                        selectTextOnFocus={false}
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        error={touched.username && errors.username}
                        onPressIn={() => Alert.alert('Not Editable')}
                      />
                      <Input
                        placeholder="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        onFocus={() => this.handleFocus()}
                        secureTextEntry
                        error={touched.password && errors.password}
                      />
                      <Input
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={touched.email && errors.email}
                      />
                      <Input
                        placeholder="Name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        onFocus={() => this.handleFocus()}
                        error={touched.name && errors.name}
                      />
                      <Input
                        placeholder="Address"
                        value={values.address}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        onFocus={() => this.handleFocus()}
                        error={touched.address && errors.address}
                      />
                      <Input
                        placeholder="Postcode"
                        value={values.postcode}
                        onChangeText={handleChange('postcode')}
                        onBlur={handleBlur('postcode')}
                        onFocus={() => this.handleFocus()}
                        error={touched.postcode && errors.postcode}
                      />
                      <Input
                        placeholder="City"
                        value={values.city}
                        onChangeText={handleChange('city')}
                        onBlur={handleBlur('city')}
                        onFocus={() => this.handleFocus()}
                        error={touched.city && errors.city}
                      />
                      <Input
                        placeholder="Country"
                        value={values.country}
                        onChangeText={handleChange('country')}
                        onBlur={handleBlur('country')}
                        onFocus={() => this.handleFocus()}
                        error={touched.country && errors.country}
                      />
                    </ScrollView>

                    <Text style={styles.uploadText}>Uploaded Images</Text>
                    <View style={styles.AvatarContainer}>
                      <Avatar
                        avatarStyle={{
                          borderRadius: 10,
                        }}
                        overlayContainerStyle={{
                          borderRadius: 10,
                          marginLeft: 5,
                          backgroundColor: colors.primary,
                        }}
                        size={'medium'}
                        icon={{
                          name: 'upload',
                          type: 'font-awesome',
                          color: 'white',
                        }}
                        rounded
                        activeOpacity={0.7}
                        onPress={() => this.editPictureHandler()}
                      />
                      <View style={styles.wall} />

                      {this.state.images && this.state.images.length > 0
                        ? this.state.images.map(
                            (img: string, index: number) => {
                              return (
                                <Image
                                  key={index}
                                  style={{
                                    width: 75,
                                    height: 75,
                                    marginLeft: 5,
                                    marginRight: 5,
                                  }}
                                  source={{uri: img}}
                                />
                              );
                            },
                          )
                        : user.images &&
                          user.images.length > 0 &&
                          user.images.map((img: string, index: number) => {
                            return (
                              <Image
                                key={index}
                                style={{
                                  width: 75,
                                  height: 75,
                                  marginLeft: 5,
                                  marginRight: 5,
                                }}
                                source={{uri: img}}
                              />
                            );
                          })}
                    </View>

                    <Button
                      disabled={!isUpdatable}
                      over_style={!isUpdatable ? {opacity: 0.6, marginBottom: 75} : {opacity: 1, marginBottom: 75}}
                      text="Update"
                      onPress={handleSubmit}
                    />
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

export default connect(mapStateToProps, {
  updateUser,
  logoutUser,
})(Profile);
