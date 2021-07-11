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
import {addProduct} from '../../../store/actions/product';
//interface
import {IProduct} from '../../../interface';
//schema
import {productSchema} from '../../../schemas';

Icon.loadFont();

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  addProduct: (product: IProduct) => void;
}

interface State {
  image: string;
}

const default_Img = require('../../../assets/default.png');

class AddProduct extends Component<Props, State> {
  state: State = {
    image: '',
  };

  formRef = React.createRef();

  editPictureHandler = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
      forceJpg: true,
      writeTempFile: true,
      minFiles: 1,
      maxFiles: 1,
    }).then(image => {
      console.log(image, 'image');
      let source = image.path;

      this.setState({
        image: source,
      });
    });
  };

  handleSubmit = (values: IProduct, resetForm: any) => {
    if (this.state.image === '') {
      return Alert.alert('Image Required!');
    }
    /**
     * TODO
     * dispatch product
     * reset form
     * navigate
     */
    const {addProduct, navigation} = this.props;

    //add selected image to obj.
    values.image = this.state.image;
    addProduct(values);
    resetForm();
    Alert.alert('Successfully Added.');
    navigation.navigate('Products');
  };

  handleFormSubmit = () => {
    if (this.formRef) {
      if (this.formRef.current) {
        this.formRef.current.handleSubmit();
      }
    }
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Header
          title="AddProduct"
          backButtonPress={() => navigation.goBack()}
          addButtonPress={() => this.handleFormSubmit()}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView bounces={false}>
            <Formik
              initialValues={{
                id: 0,
                name: '',
                description: '',
              }}
              innerRef={this.formRef}
              validationSchema={productSchema}
              onSubmit={(values, {resetForm}) => {
                this.handleSubmit(values, resetForm);
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
                      <Input
                        placeholder="Name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        error={touched.name && errors.name}
                      />
                      <Text>{errors['name']}</Text>
                      <Input
                        placeholder="Description"
                        value={values.description}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        error={
                          touched.description && errors.description
                        }
                      />
                      <Text>{errors['description']}</Text>
                    </ScrollView>

                    <Text style={styles.uploadText}>Upload Image</Text>
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

                      <Image
                        style={{width: 75, height: 75}}
                        source={
                          this.state.image !== ''
                            ? {uri: this.state.image}
                            : default_Img
                        }
                      />
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

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps, {
  addProduct,
})(AddProduct);
