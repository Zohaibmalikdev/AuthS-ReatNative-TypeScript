import React, {Component} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  Alert,
  Image,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
//local
import {Input, Button, Header} from '../../../components';
import styles from './styles';
import {colors} from '../../../layout/colors';
//interface
import {IUser} from '../../../interface';
//schema
import {registerSchema} from '../../../schemas';

Icon.loadFont();

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
interface State {
  image: string;
  images: string[];
}

const default_Img = require('../../../assets/default.png');

class Register extends Component<Props, State> {
  state: State = {
    image: '',
    images: [],
  };

  formRef = React.createRef();

  editPictureHandler = () => {
    try {
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
          });
        }
      });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  handlePreview = (values: IUser) => {
    if (this.state.images.length <= 0)
      return Alert.alert('Please Upload Image');
    const {navigation} = this.props;
    /**
     * TODO
     * add id,
     * navigage -> navigate('Preview', values);
     */
    values.id = Math.floor(Math.random() * 10);
    values.images = this.state.images;
    navigation.navigate('Preview', {user: values});
  };

  handleSubmit = () => {
    if (this.formRef) {
      if (this.formRef.current) {
        this.formRef.current.handleSubmit();
      }
    }
  };

  render() {
    const {images} = this.state;
    const {navigation} = this.props;
    console.log(this.formRef, 'form');
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView bounces={false}>
            <Header
              title="Register"
              backButtonPress={() => navigation.goBack()}
              viewButtonPress={() => this.handleSubmit()}
            />

            <Formik
              initialValues={{
                id: 0,
                username: '',
                password: '',
                name: '',
                address: '',
                postcode: '',
                city: '',
                country: '',
                email: '',
              }}
              innerRef={this.formRef}
              validationSchema={registerSchema}
              onSubmit={values => {
                this.handlePreview(values);
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
                      <Text style={{fontSize: 12, fontWeight: '100', borderBottomWidth: 4, borderBottomColor: 'white'}}>*all fields are required, and max of 2 images can be uploaded</Text>
                      <Input
                        placeholder="Username"
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        error={touched.username && errors.username}
                      />
                      {errors.username && <Text>{errors.username}</Text>}
                      <Input
                        placeholder="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry
                        error={touched.password && errors.password}
                      />
                      {errors.password && <Text>{errors.password}</Text>}
                      <Input
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={touched.email && errors.email}
                      />
                      {errors.email && <Text>{errors.email}</Text>}
                      <Input
                        placeholder="name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        error={touched.name && errors.name}
                      />
                      {errors.name && <Text>{errors.name}</Text>}
                      <Input
                        placeholder="address"
                        value={values.address}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        error={touched.address && errors.address}
                      />
                      {errors.address && <Text>{errors.address}</Text>}
                      <Input
                        placeholder="postcode"
                        value={values.postcode}
                        onChangeText={handleChange('postcode')}
                        onBlur={handleBlur('postcode')}
                        error={touched.postcode && errors.postcode}
                      />
                      {errors.postcode && <Text>{errors.postcode}</Text>}
                      <Input
                        placeholder="city"
                        value={values.city}
                        onChangeText={handleChange('city')}
                        onBlur={handleBlur('city')}
                        error={touched.city && errors.city}
                      />
                      {errors.city && <Text>{errors.city}</Text>}
                      <Input
                        placeholder="country"
                        value={values.country}
                        onChangeText={handleChange('country')}
                        onBlur={handleBlur('country')}
                        error={touched.country && errors.country}
                      />
                      {errors.country && <Text>{errors.country}</Text>}

                      <Text style={styles.uploadText}>
                        Upload Images [ID, Passport]
                      </Text>
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

                        {images.length > 0 ? (
                          images.map((img: string, index: number) => {
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
                          })
                        ) : (
                          <Image
                            style={{width: 75, height: 75}}
                            source={default_Img}
                          />
                        )}
                      </View>
                    </ScrollView>
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

export default Register;
