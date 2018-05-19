
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStore } from '../../store';

import './index.scss';



@withStore
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
