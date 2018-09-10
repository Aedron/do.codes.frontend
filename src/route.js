
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Posts from './component/Posts';
import Post from './component/Post';



const AppRoute = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path="/" component={Posts}/>
        <Route path="/post/:id" component={Post}/>
      </Switch>
    </Router>
  </div>
);


export default AppRoute;
