import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import Posts from './component/Posts';
import Post from './component/Post';
import Nav from "./component/Nav";
import NavButton from "./component/NavButton";
import PostEdit from './component/PostEdit';


const AppRoute = () => (
  <Router>
    <div id="app">
      <Nav/>
      <NavButton/>
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route path="/post/:id" component={Post} />
        <Route path="/new" component={PostEdit} />
        <Route path="/edit/:id" component={PostEdit} />
      </Switch>
    </div>
  </Router>
);


export default AppRoute;
