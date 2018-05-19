
import React from 'react';
import { observer } from 'mobx-react';

import Nav from './component/Nav';
import Home from './component/Posts';



import './style/index.scss';
import Posts from "./component/Posts";


function App() {
  return (
    <div id="app">
      <Nav />
      <Posts />
    </div>
  );
}


export default observer(App);
