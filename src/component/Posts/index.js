import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {store, withStore} from "../../store";

import './index.scss';


@withStore
@observer
class Posts extends Component {
    componentDidMount() {
      console.log(this.props.store);
        return this.props.store.fetchPosts();
    }

    static renderPost = (post, index) => {
        const {title, content, cover} = post;
        const {width, height} = store;

        return (
            <div
                className="post"
                style={{width, height}}
                key={index}
            >

            </div>
        );
    };

    render() {
        const { posts } = this.props.store;
        return (
            <div
                if={store.view === 'posts'}
                className="posts"
            >
                {posts.map(Posts.renderPost)}
            </div>
        );
    }
}


export default Posts;
