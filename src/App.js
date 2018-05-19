
import React from 'react';
import { observer } from 'mobx-react';

import Home from './page/Home';
import Nav from './component/Nav';



import './style/index.scss';


function App() {
  return (
    <div id="app">
      <Nav />
      <Home />
    </div>
  );
}


export default observer(App);
