
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStore } from '../../store';

import './index.scss';



@withStore
class Posts extends Component {
  render() {
    return (
      <div className="posts">

      </div>
    );
  }
}


export default Posts;
