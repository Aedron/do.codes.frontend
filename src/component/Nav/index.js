
import React from 'react';
import {observer} from "mobx-react";
import { withRouter } from 'react-router-dom';

import { store } from '../../store';

import "./index.scss";

import D0 from '../../static/pics/d0.svg';
import O0 from '../../static/pics/o0.svg';
import POINT from '../../static/pics/point.svg';
import C from '../../static/pics/c.svg';
import O1 from '../../static/pics/o1.svg';
import D1 from '../../static/pics/d1.svg';
import E from '../../static/pics/e.svg';
import S from '../../static/pics/s.svg';
import CLOUD from '../../static/pics/cloud.svg';


function goTo(view, history) {
  const { push, location: { pathname } } = history;
  switch (view) {
    case 'github': {
      return window.open('https://github.com/HuQingyang');
    }
    case 'posts': {
      push('/');
      break;
    }
    default: return;
  }
  store.toggleShowNav(false);
}

function Nav({history}) {
  const { showNav, width, height } = store;
  const scale = showNav ?
    Math.sqrt(width * width + height * height) / 55 * 2 + 1 : 1;

  let containerStyle;
  const ratio = width / height;
  if (ratio > 2.5) {
    const itemWidth = height * 2.2;
    containerStyle = {
      height: '100%',
      width: `${itemWidth}px`,
      left: `${(width - itemWidth) / 2}px`
    }
  } else if (ratio < 1.7) {
    const itemHeight = Math.min(width, height);
    containerStyle = {
      height: `${itemHeight}px`,
      width: `100%`,
      top: `${(height - itemHeight) / 2}px`
    }
  }

  return (
    <div className={`nav-container${showNav ? ' show' : ''}`}>
      <div
        className="slogan"
        style={containerStyle}
      >
        <img alt="nav" className="d0" src={D0} onClick={goTo.bind(null, 'posts', history)} />
        <img alt="nav" className="o0" src={O0} />
        <img alt="nav" className="point" src={POINT} onClick={goTo.bind(null, 'github', history)} />
        <img alt="nav" className="c" src={C} />
        <img alt="nav" className="o1" src={O1} />
        <img alt="nav" className="d1" src={D1} />
        <img alt="nav" className="e" src={E} />
        <img alt="nav" className="s" src={S} />
        <img alt="nav" className="cloud0" src={CLOUD} />
        <img alt="nav" className="cloud1" src={CLOUD} />
        <img alt="nav" className="cloud2" src={CLOUD} />
      </div>
      <div
        key={1}
        className={`nav-bg${showNav ? ' show' : ''}`}
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
}


export default withRouter(observer(Nav));
