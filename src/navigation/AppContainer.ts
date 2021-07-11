import {enableScreens} from 'react-native-screens';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';



import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

//main app
import Products from '../screens/AppScreens/Products';
import Profile from '../screens/AppScreens/Profile';
import AddProduct from '../screens/AppScreens/Product/AddProduct';

//auth 
import Login from '../screens/AuthScreens/Login';
import Register from '../screens/AuthScreens/Register';
import Preview from '../screens/AuthScreens/Preview';
import AuthLoading from '../screens/AuthLoading';

//require
enableScreens();

const MainStack = createStackNavigator(
  {
    Products: {screen: Products},
  },
  {
    initialRouteName: 'Products',
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator(
  {
    Login: {screen: Login},
    Register: {screen: Register},
    Preview: {screen: Preview},
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const AppStack = createDrawerNavigator(
  {
    Products: {screen: MainStack},
    Profile: {screen: Profile},
    AddProduct: {screen: AddProduct},
  },
  {
    drawerWidth: width - 50,
    drawerPosition: 'left',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      AuthStack: AuthStack,
      AppStack: AppStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
