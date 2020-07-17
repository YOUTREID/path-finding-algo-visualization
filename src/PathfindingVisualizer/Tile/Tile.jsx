import React, {Component} from 'react';

import './Tile.css';

export default class Tile extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'tile-finish'
      : isStart
      ? 'tile-start'
      : isWall
      ? 'tile-wall'
      : '';

    return (
      <div
        id={`tile-${row}-${col}`}
        className={`tile ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}
