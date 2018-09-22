import React, { Component, Fragment } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import Editor from "../Editor";
import { withStore } from "../../store";
import { upload, getCDNLink } from "../../utils/qiniu";

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
    cover: "",
    maxSize: false,
    preview: true
  };

  input = null;

  get isNew() {
    return !this.props.match.params.id;
  }

  componentDidMount() {
    if (this.isNew) {
      this.setState({ loading: false });
    } else {
      this.getPostData();
    }
    this.input.addEventListener("change", this.onUploadChange);
  }

  getPostData = () => {
    // TODO
  };

  onChangeContent = content => {
    this.setState({ content });
    return content;
  };

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  onChangeTags = e => {
    this.setState({ tags: e.target.value });
  };

  onUploadCover = () => {
    this.input.click();
  };

  onUploadChange = async () => {
    const cover = this.input.files[0];
    if (!cover) return;
    try {
      await upload(cover, cover.name, null, {
        next: console.log,
        error: console.log,
        complete: ({ key }) => {
          this.setState({ cover: getCDNLink(key) });
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { loading, content, title, tags } = this.state;
    return (
      <Fragment>
        <input
          style={{ display: "none" }}
          ref={i => (this.input = i)}
          type="file"
          name="pic"
          accept="image/*"
        />
        <div if={loading}>Loading</div>
        <div else className="post-edit">
          <input
            className="title-editor"
            value={title}
            onChange={this.onChangeTitle}
            placeholder="Title"
          />
          <input
            className="tags-editor"
            value={tags}
            onChange={this.onChangeTags}
            placeholder="Tags"
          />
          <div
            className="cover-upload"
            onClick={this.onUploadCover}
            style={{
              backgroundImage: `url(${this.state.cover})`
            }}
          >
            <i className="fa fa-file-picture-o " />
            <p>上传封面</p>
          </div>
          <Editor content={content} onChange={this.onChangeContent} />
        </div>
      </Fragment>
    );
  }
}

export default PostEdit;
