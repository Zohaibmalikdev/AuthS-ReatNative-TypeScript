/**
 * @format
 */

import 'react-native';

interface IPagination {
  current_page: number;
  current_count: number;
  total_count: number;
}

interface IResponse {
  data: any[];
  pagination_data: {};
}

describe('complete request example of data and pagination_data', () => {
  let limit: number;
  let page: number;
  let data: number[] = [];

  let result: IResponse;
  let result_2: IResponse;
  let result_3: IResponse;

  beforeEach(() => {
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    page = 1;
    limit = 3;

    //result for page = 1
    result = {
      data: [1, 2, 3],
      pagination_data: {
        current_page: 1,
        current_count: 3,
        total_count: 9,
      },
    };
    //result for page = 2
    result_2 = {
      data: [4, 5, 6],
      pagination_data: {
        current_page: 2,
        current_count: 6,
        total_count: 9,
      },
    };
    //result for page = 3
    result_3 = {
      data: [7, 8, 9],
      pagination_data: {
        current_page: 3,
        current_count: 9,
        total_count: 9,
      },
    };
  });

  /**
   * *******************************************************
   *  response = [data, pagination_data]
   * *******************************************************
   */
  it('response cycle with page 1', () => {
    expect(prepareResponse(data, page, limit)).toEqual(result);
  });

  it('response cycle with page 2', () => {
    expect(prepareResponse(data, (page = 2), limit)).toEqual(result_2);
  });

  it('response cycle with page 3', () => {
    expect(prepareResponse(data, (page = 3), limit)).toEqual(result_3);
  });
});

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
  let pagination_data = paginationData(page, limit);
  let tempdata = pagination(data, page, limit);

  tempRes.data = tempdata;
  tempRes.pagination_data = pagination_data;

  return tempRes;
}

describe('check for | pagination & pagination_data |', () => {
  // Pagination data
  let limit: number;
  let page: number;
  let data: number[] = [];
  //pagination by page with limit 3
  let pagination_data_page_1: IPagination;
  let pagination_data_page_2: IPagination;
  let pagination_data_page_3: IPagination;

  //pagination by page with limit 4
  let pagination_data_page_4: IPagination;
  let pagination_data_page_5: IPagination;
  let pagination_data_page_6: IPagination;

  beforeEach(() => {
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    limit = 3;
    pagination_data_page_1 = {
      current_page: 1,
      current_count: 3,
      total_count: 9,
    };
    pagination_data_page_2 = {
      current_page: 2,
      current_count: 6,
      total_count: 9,
    };
    pagination_data_page_3 = {
      current_page: 3,
      current_count: 9,
      total_count: 9,
    };

    pagination_data_page_4 = {
      current_page: 1,
      current_count: 4,
      total_count: 9,
    };
    pagination_data_page_5 = {
      current_page: 2,
      current_count: 8,
      total_count: 9,
    };
    pagination_data_page_6 = {
      current_page: 3,
      current_count: 9,
      total_count: 9,
    };
  });

  /**
   * *******************************************************
   *  page = [1,2,3], limit = 3
   * *******************************************************
   */

  //page 1
  it('check if it return correct page = 1, limit = 3 ', () => {
    expect(pagination(data, (page = 1), limit)).toEqual([1, 2, 3]);
  });

  //page 2
  it('check if it return correct page = 2, limit = 3', () => {
    expect(pagination(data, (page = 2), limit)).toEqual([4, 5, 6]);
  });

  //page 3
  it('check if it return correct page = 3, limit = 3', () => {
    expect(pagination(data, (page = 3), limit)).toEqual([7, 8, 9]);
  });

  it('check if it return correct pagination data with page = 1, limit = 3', () => {
    expect(paginationData((page = 1), limit)).toEqual(pagination_data_page_1);
  });

  it('check if it return correct pagination data with page = 2, limit = 3', () => {
    expect(paginationData((page = 2), limit)).toEqual(pagination_data_page_2);
  });

  it('check if it return correct pagination data with page = 3, limit = 3', () => {
    expect(paginationData((page = 3), limit)).toEqual(pagination_data_page_3);
  });

  /**
   * *******************************************************
   *  page = [1,2,3] , limit = 4
   * *******************************************************
   */

  //page 1
  it('check if it return correct page = 1, limit = 4 ', () => {
    expect(pagination(data, (page = 1), (limit = 4))).toEqual([1, 2, 3, 4]);
  });

  //page 2
  it('check if it return correct page = 2, limit = 4', () => {
    expect(pagination(data, (page = 2), (limit = 4))).toEqual([5, 6, 7, 8]);
  });

  //page 3
  it('check if it return correct page = 3, limit = 4', () => {
    expect(pagination(data, (page = 3), (limit = 4))).toEqual([9]);
  });

  it('check if it return correct pagination data with page = 1, limit = 4', () => {
    expect(paginationData((page = 1), (limit = 4))).toEqual(
      pagination_data_page_4,
    );
  });

  it('check if it return correct pagination data with page = 2, limit = 4', () => {
    expect(paginationData((page = 2), (limit = 4))).toEqual(
      pagination_data_page_5,
    );
  });

  it('check if it return correct pagination data with page = 3, limit = 4', () => {
    expect(paginationData((page = 3), (limit = 4))).toEqual(
      pagination_data_page_6,
    );
  });
});

function paginationData(page: number, limit: number) {
  let masterData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //-> describe 1
  let count = page * limit;
  let current_count = masterData.length < count ? masterData.length : count;
  let temp = {
    current_page: page,
    current_count: current_count,
    total_count: masterData.length,
  };
  return temp;
}

function pagination(data: [], page: number, limit: number) {
  let skip: number;
  skip = (page - 1) * limit;
  let tempArr = data.splice(skip, limit);
  return tempArr;
}
