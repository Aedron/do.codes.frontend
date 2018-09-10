import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import Posts from './component/Posts';
import Post from './component/Post';
import Nav from "./component/Nav";
import NavButton from "./component/NavButton";


const AppRoute = () => (
  <Router>
    <div id="app">
      <Nav/>
      <NavButton/>
      <Switch>
        <Route exact path="/" component={Posts}/>
        <Route path="/post/:id" component={Post}/>
      </Switch>
    </div>
  </Router>
);


export default AppRoute;
