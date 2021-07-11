import {REGISTER, LOGIN, LOGOUT} from '../type';
import {IUser} from '../../interface';


interface Action {
  type: string;
  payload: any;
}
interface State {
  isLoggedIn: boolean;
  userToken: string;
  user: IUser;
}

const intialState = {
  user: {
    username: '',
    password: '',
    name: '',
    address: '',
    postcode: '',
    city: '',
    country: '',
    image: '',
    id: 0,
  },
  isLoggedIn: false,
  userToken: '',
};

export default (state: State = intialState, action: Action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: false,
        userToken: '',
      };
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userToken: '',
      };
    default:
      return state;
  }
};
