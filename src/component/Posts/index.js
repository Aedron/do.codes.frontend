
import React, { Component } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { observer } from 'mobx-react';
import { store } from "../../store";

import './index.scss';



@observer
class Posts extends Component {
  componentDidMount() {
    // return this.props.store.fetchPosts();
  }

  renderPost = (post, index) => {
    const { title, content, cover } = post;
    const { innerWidth, innerHeight } = window;

    return (
      <div
      className="post"
      style={{
        width: innerWidth,
        height: innerHeight
      }}
      key={index}
    >
      <div className="post-bg"/>
      <div className="post-cover" style={{ backgroundImage: `url("${cover}")` }}/>
      <div className="post-info">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </div>
    );
  };

  render() {
    return (
      <div if={store.view === 'posts'} className="posts">
        <ParallaxProvider>
          {store.posts.map(this.renderPost)}
        </ParallaxProvider>
      </div>
    );
  }
}


export default Posts;
