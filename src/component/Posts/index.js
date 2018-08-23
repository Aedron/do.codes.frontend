import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {withStore} from "../../store";

import Post from './Post';

import './index.scss';


@withStore
@observer
class Posts extends Component {
    componentDidMount() {
      console.log(this.props.store);
        return this.props.store.fetchPosts();
    }

    render() {
        const { store } = this.props;
        const { posts } = store;
        return (
            <div
                if={store.view === 'posts' && posts}
                className="posts"
            >
                {posts.map(post => (
                    <Post key={post.title} post={post} />
                ))}
            </div>
        );
    }
}


export default Posts;
