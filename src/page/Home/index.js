
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStore } from '../../store';



@withStore
class Home extends Component {
  render() {
    console.log(this.props);
    return (null)
  }
}


export default Home;
