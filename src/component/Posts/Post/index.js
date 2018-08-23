import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {withStore} from "../../../store";

import './index.scss';


function Post({post}) {
    const { title, cover, intero, tags } = post;
    return (
        <div className="post">
            {title}
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.object
};


export default withStore(observer(Post));
