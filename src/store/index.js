
import React from 'react';
import { observable, action } from 'mobx';

import { hoc } from '../utils';



class Store {
  @observable
  posts = [];
}


const store = new Store();
const withStore = (Component) => {
  return hoc.inject(Component, { store });
};


export {
  store,
  withStore
};
