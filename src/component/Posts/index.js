
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { store } from "../../store";

import './index.scss';



@observer
class Posts extends Component {
  componentDidMount() {
    // return this.props.store.fetchPosts();
  }
  render() {
    return (
      <div className="posts">

      </div>
    );
  }
}


export default Posts;
