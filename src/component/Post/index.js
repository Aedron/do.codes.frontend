
import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import {withStore} from "../../store";

import './index.scss';


@withStore
@withRouter
@observer
class Post extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <div className="post">
        {id}
      </div>
    );
  }
}


export default withStore(observer(Post));
