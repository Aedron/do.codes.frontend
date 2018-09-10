import React, {PureComponent, Fragment} from 'react';
import {observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import {withStore} from "../../store";

import './index.scss';


@withStore
@withRouter
@observer
class Post extends PureComponent {
    state = {
        post: null
    };

    async componentDidMount() {
        const {
            store,
            match: {params: { id }}
        } = this.props;

        this.setState({ post: await store.getPost(id)})
    }

    render() {
        const { post } = this.state;
        return (
            <Fragment>
                <div if={post} className="post">
                    {JSON.stringify(this.state.post)}
                </div>
                <div else>Loading</div>
            </Fragment>
        );
    }
}


export default withStore(observer(Post));
