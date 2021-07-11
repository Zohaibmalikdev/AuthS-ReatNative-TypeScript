import {Dispatch} from 'redux';

import {ADD_PRODUCT, LOADING} from '../type';

interface IProduct {
  name: string;
  description: string;
  image: string;
  id: number;
}

export const addProduct = (product: IProduct) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    dispatch({
      type: ADD_PRODUCT,
      payload: product,
    });
    dispatch({
      type: LOADING,
      payload: false,
    });
  };
};
