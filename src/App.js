import React from 'react';
import {observer} from 'mobx-react';

import Nav from './component/Nav';
import NavButton from "./component/NavButton";
import AppRoute from './route';
import {store} from "./store";


import './style/index.scss';


function App() {
    return (
      <AppRoute/>
    );
}


export default observer(App);
