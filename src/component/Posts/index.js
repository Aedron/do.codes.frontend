import React, {PureComponent} from 'react';
import {observer} from 'mobx-react';
import {withStore} from "../../store";

import PostCard from './PostCard';

import './index.scss';


@withStore
@observer
class Posts extends PureComponent {
  static renderPost(post) {
    return <PostCard key={post.title} post={post}/>;
  }

  componentDidMount() {
    console.log(this.props.store);
    return this.props.store.fetchPosts();
  }

  render() {
    const {store} = this.props;
    const {posts} = store;
    return (
      <div
        if={store.view === 'posts' && posts}
        className="posts"
      >
        {posts.map(Posts.renderPost)}
      </div>
    );
  }
}


export default Posts;
