import React, { Component, Fragment } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import { withStore } from "../../store";

import "./index.scss";
import * as toast from "../../utils/toast";

@withStore
@withRouter
@observer
class Post extends Component {
  state = {
    post: null
  };

  async componentDidMount() {
    const {
      store,
      match: {
        params: { id }
      }
    } = this.props;

    const [err, data] = await store.fetchPost(id);
    if (err) {
      return toast.err(`拉取文章数据失败 - ${err.toString()}`);
    }
    this.setState({ post: data });
  }

  render() {
    const { post } = this.state;
    return (
      <Fragment>
        <div if={post} className="post">
          {JSON.stringify(this.state.post)}
        </div>
        <div else>Loading</div>
      </Fragment>
    );
  }
}

export default Post;
