import React, { Component, Fragment } from "react";
import Milk from "react-milkdown";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import { withStore } from "../../store";

import "./index.scss";

@withStore
@withRouter
@observer
class PostEdit extends Component {
  state = {
    loading: true,
    title: "",
    content: "",
    tags: "",
    cover: ""
  };

  get isNew() {
    return !this.props.match.params.id;
  }

  componentDidMount() {
    if (this.isNew) {
      this.setState({ loading: false });
    } else {
      this.getPostData();
    }
  }

  getPostData = () => {
    // TODO
  };

  onChangeContent = content => {
    this.setState({ content });
    return content;
  };

  render() {
    const { loading, content } = this.state;
    return (
      <Fragment>
        <div if={loading}>Loading</div>
        <div else className="post-edit">
          <div className="cover-upload">
            <i className="fas fa-cloud-upload-alt" />
            <p>上传封面</p>
          </div>
          <Milk
            className="content-editor"
            value={content}
            onChange={this.onChangeContent}
          />
        </div>
      </Fragment>
    );
  }
}

export default PostEdit;
