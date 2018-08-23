
import React from 'react';
import { observable, action } from 'mobx';

import { hoc, http } from '../utils';
import { posts as mockPosts } from '../mock';


class Store {
  constructor() {
    window.addEventListener('resize', this.handleResize);
  }

  @observable view = 'posts';
  @action changeView = (view) => {
    this.view = view;
  };
  @observable showNav = false;
  @action toggleShowNav = () => {
    this.showNav = !this.showNav;
  };

  @observable posts = null;
  @action fetchPosts = async () => {
    try {
      this.posts = await http.getPosts();
    } catch (e) {
        this.posts = mockPosts;
    }
  };

  @observable width = window.innerWidth;
  @observable height = window.innerHeight;
  @action handleResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  };
}


const store = new Store();
const withStore = (Component) => {
  return hoc.inject(Component, { store });
};


export {
  store,
  withStore
};
