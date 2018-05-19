
import React, {Component} from 'react';
import { observer } from 'mobx-react';

import { store } from '../../store';

import "./index.scss";


@observer
class NavButton extends Component {
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
    const { showNav } = store;
    // const showNav = true;

    return [
      <p
        key={0}
        className={`nav-button-text${isPointed ? ' pointed' : ''}`}
      >
        {
          (showNav ? ['B', 'A', 'C', 'K'] : ['M', 'E', 'N', 'U'])
            .map(i => (
              <span
                key={i}
                className={isPointed ? ' pointed' : ''}
              >{i}</span>
            ))
        }
      </p>,
      <svg
        key={1}
        className={`nav-button${isPointed ? ' pointed' : ''}${showNav ? ' showNav' : ''}`}
        onMouseEnter={this.handlePointIn}
        onMouseLeave={this.handlePointOut}
        onClick={store.toggleShowNav}
      >
        <g>
          {
            this.offsets.map((line) => line.map(xy => {
              let x, y, w, h, r;
              if (showNav) {
                r = '6%';
                const [i, j] = xy;
                if (i === 2 && j === 1) {
                  w = "6%";
                  h = "60%";
                  x = '47%';
                  y = "20%";
                } else if (i === 2 && j === 3) {
                  w = "60%";
                  h = "6%";
                  x = '20%';
                  y = "47%";
                } else {
                  w = "2%";
                  h = "2%";
                  x = y = '49%';
                }
              } else {
                r = '100%';
                if (isPointed) {
                  x = y = '40%';
                  w = h = '20%';
                } else {
                  x = `${(0.1 + xy[0] / 5) * 100 - 5}%`;
                  y = `${(0.1 + xy[1] / 5) * 100 - 5}%`;
                  w = h = '10%';
                }
              }
              return (
                <rect
                  key={`${xy[0]}${xy[1]}`}
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx={r}
                  ry={r}
                />
              )
            }))
          }
        </g>
      </svg>
    ]
  }
}


export default NavButton;
