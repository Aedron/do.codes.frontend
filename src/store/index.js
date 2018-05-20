
import React from 'react';
import { observable, action } from 'mobx';

import { hoc, http } from '../utils';



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

  @observable posts = [
    { title: "Functional JavaScript 之 Transducer", content: "在函数式编程中，Transducer 是一种用于处理数据的高效、可组合且不会产生的中间数据的函数。", cover: 'https://www.heeds.eu/wp-content/uploads/heeds-img-home-3.jpg' },
    { title: "面向前端的 Lottie & AE 动画手把手入门教学", content: "因为我一直比较关注 Web 领域的设计趋势, 很早之前就听很说了 Lottie 这个项目, 但是一直没时间和机会去尝试, 最近终于有时间机会于是尝试了一把, 在这里分享一下。", cover: 'https://www.heeds.eu/wp-content/uploads/heeds-img-home-2.jpg' }
  ];
  @action fetchPosts = async () => {
    const posts = await http.getPosts();
    this.posts = posts || [];
    console.log(this.posts);
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
