import { observable, action } from "mobx";

import { hoc, http, promiseWrapper } from "../utils";
import { posts as mockPosts } from "../mock";

class Store {
  constructor() {
    window.addEventListener("resize", this.handleResize);
  }

  /*
    ** View
     */
  @observable
  showNav = false;
  @action
  toggleShowNav = show => {
    this.showNav = typeof show === "boolean" ? show : !this.showNav;
  };

  /*
    ** Observe window size for rerender canvas
     */
  @observable
  width = window.innerWidth;
  @observable
  height = window.innerHeight;
  @action
  handleResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  };

  /*
    ** PostList of Home
     */
  @observable
  postList = null;
  @action
  fetchPostList = async () => {
    const [err, data] = await promiseWrapper(http.getPostList);
    this.postList = err ? [] : data;
  };

  /*
    ** Post Detail
     */
  @observable
  posts = {};
  @action
  fetchPost = async id => {
    const [err, data] = await promiseWrapper(http.getPost(id));
    if (err) {
      throw err;
    } else {
      this.posts[id] = data;
    }
    return data;
  };
  @action
  getPost = id => {
    return this.posts[id] || this.fetchPost(id);
  };
}

const store = new Store();
const withStore = Component => {
  return hoc.inject(Component, { store });
};

export { store, withStore };
