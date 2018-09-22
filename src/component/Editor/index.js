import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import * as Showdown from "showdown";
import ReactMde, { DraftUtil, MarkdownUtil, ReactMdeCommands } from "react-mde";

import { upload, getCDNLink } from "../../utils/qiniu";

import "./index.scss";
import "react-mde/lib/styles/css/react-mde-all.css";

class Editor extends Component {
  static propTypes = {
    content: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  state = {
    maxSize: false,
    preview: true,
    showUploader: false
  };

  input = null;

  editorState = null;

  insertCallback = null;

  converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  commands = [
    [
      {
        ...ReactMdeCommands.headerCommand,
        buttonContentBuilder: ({ iconProvider }) => iconProvider("header")
      },
      ReactMdeCommands.boldCommand,
      ReactMdeCommands.italicCommand,
      ReactMdeCommands.strikethroughCommand
    ],
    [
      {
        buttonContentBuilder: ({ iconProvider }) => iconProvider("image"),
        buttonProps: { "aria-label": "插入图片" },
        execute: state => {
          this.editorState = state;
          this.input.click();
          return new Promise((resolve, reject) => {
            this.insertCallback = [resolve, resolve];
          });
        }
      },
      ReactMdeCommands.linkCommand,
      ReactMdeCommands.quoteCommand,
      ReactMdeCommands.codeCommand
    ],
    [
      ReactMdeCommands.orderedListCommand,
      ReactMdeCommands.unorderedListCommand,
      ReactMdeCommands.checkListCommand
    ],
    [
      {
        buttonContentBuilder: ({ iconProvider }) => iconProvider("eye"),
        buttonProps: { "aria-label": "预览" },
        execute: () => {
          this.setState({ preview: !this.state.preview });
        }
      },
      {
        buttonContentBuilder: ({ iconProvider }) =>
          iconProvider("window-restore"),
        buttonProps: { "aria-label": "缩放" },
        execute: () => {
          this.setState({ maxSize: !this.state.maxSize });
        }
      }
    ]
  ];

  componentDidMount() {
    this.input.addEventListener("change", this.onUploadChange);
  }

  onUploadChange = async () => {
    const [resolve, reject] = this.insertCallback;
    const image = this.input.files[0];
    if (!image) return resolve();
    try {
      await upload(image, image.name, null, {
        next: console.log,
        error: console.log,
        complete: ({ key }) => {
          const { text, selection } = DraftUtil.getMarkdownStateFromDraftState(
            this.editorState
          );
          const { newText, insertionLength } = MarkdownUtil.insertText(
            text,
            "![",
            selection.start
          );
          const finalText = MarkdownUtil.insertText(
            newText,
            `](${getCDNLink(key)})`,
            selection.end + insertionLength
          ).newText;

          const result = DraftUtil.buildNewDraftState(this.editorState, {
            text: finalText,
            selection: {
              start: selection.start + insertionLength,
              end: selection.end + insertionLength
            }
          });
          return resolve(result);
        }
      });
    } catch (e) {
      console.error(e);
      return reject(e);
    }
  };

  render() {
    const { content, onChange } = this.props;
    const { maxSize, preview } = this.state;
    return (
      <Fragment>
        <ReactMde
          className={`editor ${maxSize ? "max" : "mini"}`}
          layout={preview ? "horizontal" : "tabbed"}
          onChange={onChange}
          editorState={content}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
          buttonContentOptions={{
            iconProvider: name => <i className={`fa fa-${name}`} />
          }}
          commands={this.commands}
        />
        <input
          style={{ display: "none" }}
          ref={i => (this.input = i)}
          type="file"
          name="pic"
          accept="image/*"
        />
      </Fragment>
    );
  }
}

export default Editor;
