import React, { Component, Fragment } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import TagsInput from "react-tagsinput";

import Editor from "../Editor";
// import TagsInput from "../TagsInput";
import { withStore } from "../../store";
import * as toast from "../../utils/toast";
import * as http from "../../utils/http";
import { upload, getCDNLink } from "../../utils/qiniu";

import "./index.scss";
import "react-tagsinput/react-tagsinput.css";

@withStore
@withRouter
@observer
class PostEdit extends Component {
  state = {
    loading: true,
    title: "",
    content: {
      markdown: "",
      html: ""
    },
    tags: [],
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
  };

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  onChangeTags = tags => {
    this.setState({ tags });
  };

  onUploadCover = () => {
    this.input.click();
  };

  onUploadChange = async () => {
    const cover = this.input.files[0];
    if (!cover) return;
    try {
      toast.info("正在上传封面...");
      await upload(cover, cover.name, null, {
        next: console.log,
        error: console.log,
        complete: ({ key }) => {
          setTimeout(() => {
            toast.ok("上传完成");
          }, 1000);
          this.setState({ cover: getCDNLink(key) });
        }
      });
    } catch (e) {
      console.error(e);
      toast.err(`上传出错 - ${e.toString()}`);
    }
  };

  onSave = async () => {
    if (!this.checkContentValid()) return;
    toast.info("发布中，请稍候...");
    const {
      title,
      content: { markdown },
      cover,
      tags
    } = this.state;
    const [err, data] = await http.createPost({
      title,
      content: markdown,
      cover,
      tags
    });
    if (err) {
      return toast.err(`发布失败 - ${err.toString()}`);
    }
    toast.ok(`发布成功`);
  };

  checkContentValid = () => {
    const {
      title,
      tags,
      cover,
      content: { markdown }
    } = this.state;
    if (!title.trim()) {
      toast.err("请输入标题");
      return false;
    }
    if (tags.length === 0) {
      toast.err("请设置标签");
      return false;
    }
    if (!cover) {
      toast.err("请上传封面");
      return false;
    }
    if (!markdown.trim()) {
      toast.err("请输入内容");
      return false;
    }
    return true;
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
            placeholder="Title here..."
          />
          <TagsInput
            className="tags-editor"
            onlyUnique
            value={tags}
            onChange={this.onChangeTags}
            inputProps={{ placeholder: "Tags here..." }}
          />
          <div
            className={`cover-upload ${
              this.state.cover.trim() ? "uploaded" : ""
            }`}
            onClick={this.onUploadCover}
            style={{
              backgroundImage: `url(${this.state.cover})`
            }}
          >
            <i className="fa fa-file-picture-o " />
            <p>上传封面</p>
          </div>
          <Editor
            content={content}
            onChange={this.onChangeContent}
            onSave={this.onSave}
          />
        </div>
      </Fragment>
    );
  }
}

export default PostEdit;
