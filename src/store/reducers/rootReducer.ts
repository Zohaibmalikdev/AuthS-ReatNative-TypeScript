import {combineReducers} from 'redux';

import AuthReducer from './AuthReducer';
import ProductReducer from './ProductReducer';

const rootReducer = combineReducers({
  
  auth: AuthReducer,
  product: ProductReducer,
});

export default rootReducer;
