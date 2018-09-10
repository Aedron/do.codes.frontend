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
    return this.props.store.fetchPostList();
  }

  render() {
    const {store} = this.props;
    const {postList} = store;
    return (
      <div
        if={postList}
        className="posts"
      >
        {postList.map(Posts.renderPost)}
      </div>
    );
  }
}


export default Posts;
