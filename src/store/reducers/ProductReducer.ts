import {ADD_PRODUCT, LOADING} from '../type';

interface Action {
  type: string;
  payload: any;
}
interface State {
  data: {
    data: any[];
    pagination_data: {};
  };
  loading: boolean;
}

interface IResponse {
  data: any[];
  pagination_data: {};
}

const intialState = {
  data: {
    data: [],
    pagination_data: {},
  },
  loading: false,
};

export default (state: State = intialState, action: Action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      let tempData = prepareProducts(action, state);
      return {
        ...state,
        data: tempData,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};


/**
 * *******************************************************
 *  to populate products 
 *    by unique_ids,
 * *******************************************************
 */

function prepareProducts(action: Action, state: State) {
  let response = {
    data: [],
    pagination_data: {},
  };

  let tempProduct = [];
  let payload = action.payload;
  let page = 1;
  let limit = 60;
  let randomId = randomInt();
  let newId = 0;

  if (state.data.data.length > 0) {
    //get entries
    for (let i = 0; i <= state.data.data.length - 1; i++) {
      //check if id exist.
      if (state.data.data[i].id !== randomId) {
        //sync old entries
        tempProduct.push(state.data.data[i]);
      }
    }
    //check if we didn't fount newID yet.
    if (newId === 0) {
      newId = randomId;
    }
  }

  //add id to obj
  payload.id = newId;
  //push new entry
  tempProduct.unshift(payload);

  //prepare response
  response = prepareResponse(tempProduct, page, limit);

  return response;
}

/**
 * *******************************************************
 *  response for front end 
 *    to list data and,
 *    use pagination to get more
 * *******************************************************
 */

function prepareResponse(data: number[], page: number, limit: number) {
  let tempRes: IResponse = {
    data: [],
    pagination_data: {},
  };
  /**
   * *******************************************************
   *  paginationData( page = 1, limit = 3)
   * *******************************************************
   */
  let pagination_data = paginationData(data, page, limit);
  let tempdata = pagination(data, page, limit);

  tempRes.data = tempdata;
  tempRes.pagination_data = pagination_data;

  return tempRes;
}


function randomInt() {
  return Math.floor(Math.random() * 500);
}

/**
 * *******************************************************
 *  paginationData
 * *******************************************************
 */

function paginationData(data: [], page: number, limit: number) {
  let count = page * limit;
  let current_count = data.length < count ? data.length : count;
  let temp = {
    current_page: page,
    current_count: current_count,
    total_count: data.length,
  };
  return temp;
}

function pagination(data: [], page: number, limit: number) {
  let skip: number;
  skip = (page - 1) * limit;
  let tempArr = data.splice(skip, limit);
  return tempArr;
}
