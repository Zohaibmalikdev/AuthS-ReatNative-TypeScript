import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';

import {REGISTER, LOGIN, LOGOUT, UPDATE_USER} from '../type';

import {IUser} from '../../interface';

type UserAction = {
  type: string;
  payload: IUser;
};

export const registerUser = (user: IUser): UserAction => ({
  type: REGISTER,
  payload: user,
});

export function loginUserService(userToken: string) {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem('userToken', userToken)
      .then(() => {
        resolve(userToken);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export const loginUser = (userToken: string) => {
  return (dispatch: Dispatch) => {
    dispatch({type: LOGIN, payload: userToken});
  };
};

export const logoutUser = () => ({
  type: LOGOUT,
});

export function logoutUserService() {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem('userToken')
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}


export const updateUser = (user: IUser) => {
  return (dispatch: Dispatch) => {
    dispatch({type: UPDATE_USER, payload: user});
  };
};
