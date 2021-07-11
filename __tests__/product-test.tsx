/**
 * @format
 */

import 'react-native';

describe('check for array', () => {
  let products: any[] = [];
  let randomId: number = 0;
  let payload = {};
  let maxRandomInt = 500;
  beforeEach(() => {
    randomId = Math.floor(Math.random() * maxRandomInt);
    payload = {id: randomId, name: 'test', description: 'hi'};
    products = [payload];
  });

  it('return a number', () => {
    let random = randomInt();
    expect(random).toEqual(random);
    expect(random).toBeLessThan(maxRandomInt);
  });

  it('return correct array', () => {
    expect(prepareProducts(products, randomId)).toMatchObject(products);
    expect(prepareProducts(products, randomId)).toHaveLength(products.length);
  });
});

function prepareProducts(products: any[], randomId: number) {
  let tempProduct = [];

  let payload = {id: randomId, name: 'test', description: 'hi'};
  let newId = 0;

  if (products.length > 0) {
    //get entries
    for (let i = 0; i <= products.length - 1; i++) {
      //check if id exist.
      if (products[i].id !== randomId) {
        //sync old entries
        tempProduct.push(products[i]);
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
  tempProduct.push(payload);
  return tempProduct;
}

function randomInt() {
  return Math.floor(Math.random() * 500);
}
