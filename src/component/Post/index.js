import React, { Component, Fragment } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Converter } from "showdown";
import "showdown-highlightjs-extension";

import { withStore } from "../../store";
import * as toast from "../../utils/toast";

import "./index.scss";

const convert = new Converter({
  extensions: ["highlightjs"],
  ghCodeBlocks: true
});

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

  static renderPost = post => {
    const { title, tags, cover, comments, content } = post;
    return (
      <Fragment>
        <h1 className="title">{title}</h1>
        <div className="tags">
          {tags.map(t => (
            <span key={t}># {t}</span>
          ))}
        </div>
        <div className="mde-preview">
          <div
            className="mde-preview-content"
            id="content"
            dangerouslySetInnerHTML={{
              __html: convert.makeHtml(content)
            }}
          />
        </div>
      </Fragment>
    );
  };

  render() {
    const { post } = this.state;
    return (
      <Fragment>
        <div if={post} className="post-container">
          {Post.renderPost(post)}
        </div>
        <div else className="post-111">
          Loading...
        </div>
      </Fragment>
    );
  }
}

export default Post;
