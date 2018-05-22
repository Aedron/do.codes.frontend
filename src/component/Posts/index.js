
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
    const { width, height } = store;

    return (
    <div
      className="post"
      style={{ width, height }}
      key={index}
    >
      <Parallax
        offsetYMax={"80%"}
        offsetYMin={"-30%"}
        slowerScrollRate
        tag="figure"
        className="post-bg"
      />
      <Parallax
        offsetYMax={"47%"}
        offsetYMin={"-10%"}
        slowerScrollRate
        tag="figure"
        className="post-cover"
      >
        <div className="post-bg-inner" style={{ backgroundImage: `url("${cover}")` }}/>
      </Parallax>
      <Parallax
        offsetYMax={"80%"}
        offsetYMin={"-50%"}
        tag="figure"
        className="post-info"
      >
        <div className="post-info-inner">
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      </Parallax>
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
