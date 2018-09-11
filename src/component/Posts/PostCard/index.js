import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { withStore } from "../../../store";
import { sliceText } from "../../../utils";
import { Link } from "react-router-dom";

import "./index.scss";

function PostCard({ post }) {
  const { title, tags, content: intro, cover, id } = post;
  return (
    <Link to={`/post/${id}`} className="post-card">
      <div className="cover-container">
        <img className="cover" src={cover} alt={title} />
      </div>
      <div className="post-card-info">
        <h3 className="title">{title}</h3>
        <hr />
        <ul className="tags">
          {tags.map(t => (
            <li key={t}>#{t}</li>
          ))}
        </ul>
        <p className="intro">{sliceText(intro, 50)}</p>
      </div>
    </Link>
  );
}

PostCard.propTypes = {
  post: PropTypes.object
};

export default withStore(observer(PostCard));
