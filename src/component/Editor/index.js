import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import * as Showdown from "showdown";
import ReactMde, { DraftUtil, MarkdownUtil, ReactMdeCommands } from "react-mde";

import { upload, getCDNLink } from "../../utils/qiniu";

import "./index.scss";
import "react-mde/lib/styles/css/react-mde-all.css";

class Editor extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  state = {
    maxSize: false,
    preview: true
  };

  converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  commands = [
    [
      ReactMdeCommands.headerCommand,
      ReactMdeCommands.boldCommand,
      ReactMdeCommands.italicCommand,
      ReactMdeCommands.strikethroughCommand
    ],
    [
      {
        buttonContentBuilder: ({ iconProvider }) => iconProvider("link"),
        buttonProps: { "aria-label": "Insert a link" },
        execute: state => {
          const { text, selection } = DraftUtil.getMarkdownStateFromDraftState(
            state
          );
          const { newText, insertionLength } = MarkdownUtil.insertText(
            text,
            "![",
            selection.start
          );
          const finalText = MarkdownUtil.insertText(
            newText,
            "](image-url)",
            selection.end + insertionLength
          ).newText;

          return DraftUtil.buildNewDraftState(state, {
            text: finalText,
            selection: {
              start: selection.start + insertionLength,
              end: selection.end + insertionLength
            }
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
          commands={this.commands}
        />
      </Fragment>
    );
  }
}

export default Editor;
