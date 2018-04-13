
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import "./index.scss";


class NavButton extends Component {
  static propTypes = {
    showNav: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };

  offsets = [
    [ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ] ],
    [ [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ],
    [ [ 3, 1 ], [ 3, 2 ], [ 3, 3 ] ]
  ];

  state = {
    isPointed: false
  };

  handlePointIn = () => {
    this.setState({ isPointed: true });
  };
  handlePointOut = () => {
    this.setState({ isPointed: false });
  };

  render() {
    const { isPointed } = this.state;
    return [
      <p
        key={0}
        className={`nav-button-text${isPointed ? ' pointed' : ''}`}
      >
        {
          (this.props.showNav ?
            ['C', 'L', 'O', 'S', 'E'] :
            ['M', 'E', 'N', 'U']).map(i => (
              <span
                key={i}
                className={isPointed ? ' pointed' : ''}
              >{i}</span>
            ))
        }
      </p>,
      <svg
        key={1}
        className={`nav-button${isPointed ? ' pointed' : ''}`}
        onMouseEnter={this.handlePointIn}
        onMouseLeave={this.handlePointOut}
        onClick={this.props.onClick}
      >
        <g if={this.props.showNav} transform="translate(-184.000000, -151.000000) scale(0.2)">
          <polygon points="223.508065 247.121191 277.413552 191.653226 282.922142 197.321485 229.016654 252.78945"/>
          <polygon points="282.922142 247.121191 277.413552 252.78945 223.508065 197.321485 229.016654 191.653226"/>
        </g>
        <g else>
          {
            this.offsets.map((line) => line.map(xy => (
              <circle
                key={`${xy[0]}${xy[1]}`}
                cx={isPointed ? '50%' : `${(0.1 + xy[0] / 5) * 100}%`}
                cy={isPointed ? '50%' : `${(0.1 + xy[1] / 5) * 100}%`}
                r={isPointed ? "15%" : "5%"}
              />
            )))
          }
        </g>
      </svg>
    ]
  }
}


export default NavButton;
