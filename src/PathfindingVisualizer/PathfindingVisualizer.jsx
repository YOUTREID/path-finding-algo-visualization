import React, { Component } from 'react';
import Tile from './Tile/Tile';
import { dijkstra, getTilesInShortestPathOrder } from '../algorithms/dijkstra';
import { aStar } from '../algorithms/aStar'
import { heart } from '../algorithms/heart'


import './PathfindingVisualizer.css';

const START_TILE_ROW = 10;
const START_TILE_COL = 10;
const FINISH_TILE_ROW = 10;
const FINISH_TILE_COL = 40;
let a = 10;
let b = 10;
let c = 10;
let d = 40;
let settingStart = false;
let settingFinish = false;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    if (settingStart) {
      const newGrid = getNewGridWithNewStart(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
      settingStart = false;
    } else if (settingFinish) {
      const newGrid = getNewGridWithNewEnd(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
      settingFinish = false;
    } else {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      // console.log("x: " + row + ", y: " + col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animate(visitedTilesInOrder, tilesInShortestPathOrder) {
    for (let i = 0; i <= visitedTilesInOrder.length; i++) {
      if (i === visitedTilesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(tilesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const tile = visitedTilesInOrder[i];
        document.getElementById(`tile-${tile.row}-${tile.col}`).className =
          'tile tile-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(tilesInShortestPathOrder) {
    for (let i = 0; i < tilesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const tile = tilesInShortestPathOrder[i];
        document.getElementById(`tile-${tile.row}-${tile.col}`).className =
          'tile tile-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startTile = grid[a][b];
    const finishTile = grid[c][d];
    const visitedTilesInOrder = dijkstra(grid, startTile, finishTile);
    const tilesInShortestPathOrder = getTilesInShortestPathOrder(finishTile);
    this.animate(visitedTilesInOrder, tilesInShortestPathOrder);
  }

  visualizeAStar() {
    const { grid } = this.state;
    const startTile = grid[a][b];
    const finishTile = grid[c][d];
    const values = aStar(grid, startTile, finishTile);
    this.animate(values[0], values[1]);
  }

  visualizeHeart() {
    const { grid } = this.state;
    const newGrid = getNewGridWithNewStart(this.state.grid, 19, 0);
    this.setState({ grid: newGrid});
    const newerGrid = getNewGridWithNewEnd(this.state.grid, 19, 49);
    this.setState({ grid: newerGrid});
    const values = heart(grid);
    this.animate(values[0], values[1]);
  }

  refreshPage() {
    window.location.reload(false);
  }

  setStart() {
    settingStart = true;
  }

  setEnd() {
    settingFinish = true;
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <div className="button">
          <button onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra's Algo
          </button>
          <div></div>
          <button onClick={() => this.visualizeAStar()}>
            Visualize A* search Algo
          </button>
          <div></div>
          <button onClick={() => this.visualizeHeart()}>
            Visualize ♥ Algo
          </button>
          <div></div>
          <button onClick={() => this.refreshPage()}>Clear</button>
        </div>
        <div className="selector">
        <button onClick={() => this.setStart()}>
            Set Start
          </button>
          <div></div>
          <button onClick={() => this.setEnd()}>
            Set End
          </button>
          <div></div>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((tile, tileIdx) => {
                  const { row, col, isFinish, isStart, isWall } = tile;
                  return (
                    <Tile
                      key={tileIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Tile>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createTile(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createTile = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_TILE_ROW && col === START_TILE_COL,
    isFinish: row === FINISH_TILE_ROW && col === FINISH_TILE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousTile: null,
    f_cost: 0,
    g_cost: 0,
    h_cost: 0,
  };
};

const getNewGridWithNewStart = (grid, row, col) => {
  const newGrid = grid.slice();
  const tile = newGrid[row][col];
  const newTile = {
    ...tile,
    isStart: true,
  };
  const oldTile = {
    ...tile,
    col: b,
    row: a,
    isStart: false,
  };

  newGrid[row][col] = newTile;
  newGrid[a][b] = oldTile;
  a = row;
  b = col;
  return newGrid;
};

const getNewGridWithNewEnd = (grid, row, col) => {
  const newGrid = grid.slice();
  const tile = newGrid[row][col];
  const newTile = {
    ...tile,
    isFinish: true,
  };
  const oldTile = {
    ...tile,
    col: d,
    row: c,
    isFinish: false,
  };
  newGrid[row][col] = newTile;
  newGrid[c][d] = oldTile;
  c = row;
  d = col;
  return newGrid;
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const tile = newGrid[row][col];
  const newTile = {
    ...tile,
    isWall: !tile.isWall,
  };
  newGrid[row][col] = newTile;
  return newGrid;
};
