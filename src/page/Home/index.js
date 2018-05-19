
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from '../../store';

import Nav from '../../component/Nav';
import Posts from '../../component/Posts';


function Home() {
  return (
    <div id="home">
      <Nav />
      <Posts />
    </div>
  )
}


export default observer(Home);
