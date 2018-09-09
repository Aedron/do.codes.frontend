import React from 'react';
import {observer} from 'mobx-react';

import Nav from './component/Nav';
import Home from './component/Posts';
import Posts from "./component/Posts";
import NavButton from "./component/NavButton";
import {store} from "./store";


import './style/index.scss';


function App() {
    return (
        <div id="app">
            <Nav/>
            <NavButton if={store.view !== 'init'}/>
            <Posts/>
        </div>
    );
}


export default observer(App);
