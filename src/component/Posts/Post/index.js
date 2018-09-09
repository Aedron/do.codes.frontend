import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {withStore} from "../../../store";
import {sliceText} from '../../../utils';

import './index.scss';


function Post({post}) {
    const {
        created, edited, title,
        tags, content: intro, cover,
        comments, id
    } = post;
    return (
        <div className="post">
            <div className="cover-container">
                <img className="cover" src={cover} alt={title} />
            </div>
            <div className="post-info">
                <h3 className="title">{title}</h3>
                <hr />
                <ul className="tags">{tags.map(t => <li key={t}>#{t}</li>)}</ul>
                <p className="intro">{sliceText(intro, 50)}</p>
            </div>
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.object
};


export default withStore(observer(Post));
