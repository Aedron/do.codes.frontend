
import React from 'react';
import { observable, action } from 'mobx';

import { hoc, http } from '../utils';



class Store {
  @observable
  posts = [];
  @action
  fetchPosts = async () => {
    const posts = await http.getPosts();
    this.posts = posts || [];
    console.log(this.posts);
  }
}


const store = new Store();
const withStore = (Component) => {
  return hoc.inject(Component, { store });
};


export {
  store,
  withStore
};
