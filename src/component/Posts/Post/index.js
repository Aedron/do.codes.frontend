import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {withStore} from "../../../store";

import './index.scss';


function Post({post}) {
    const {
        created, edited, title,
        tags, content, cover,
        comments
    } = post;
    return (
        <div className="post">
            <div className="cover-container">
                <img className="cover" src={cover} alt={title} />
            </div>
            <div>
                {title}
            </div>
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.object
};


export default withStore(observer(Post));
