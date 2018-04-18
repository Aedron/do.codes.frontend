
import React, {Component} from 'react';
import NavButton from "../NavButton";

import "./index.scss";

import DO from '../../static/do.svg';
import CODES from '../../static/codes.svg';



class Nav extends Component {
  state = {
    show: true
  };

  handleToggleShow = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { show } = this.state;
    const { innerWidth, innerHeight } = window;
    const scale = show ?
      Math.sqrt(innerWidth * innerWidth + innerHeight * innerHeight) / 55 * 2 + 1 : 1;

    return (
      <div className="nav-container">
        <NavButton
          key={0}
          showNav={show}
          onClick={this.handleToggleShow}
        />
        <div className="slogan">
        </div>
        <div
          key={1}
          className={`nav-bg${show ? ' show' : ''}`}
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    );
  }
}


export default Nav;
