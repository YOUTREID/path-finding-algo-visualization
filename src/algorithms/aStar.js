export function aStar(grid, startTile, finishTile) {
  print(grid);
  const visitedTilesInOrder = [];
  visitedTilesInOrder.push(startTile);
  startTile.g_cost = startTile.h_cost = startTile.f_cost = 0;
  finishTile.g_cost = finishTile.h_cost = finishTile.f_cost = 0;
  let open_list = [];
  let closed_list = [];
  open_list.push(startTile);
  while (open_list.length > 0) {
    let current_tile = open_list[0];
    let current_index = 0;
    for (var index = 0; index < open_list.length; index++) {
      if (open_list[index].f_cost < current_tile.f_cost) {
        current_tile = open_list[index];
        current_index = index;
      }
    }
    open_list.splice(current_index, 1);
    closed_list.push(current_tile);
    if (current_tile.isFinish === true) {
      let path = [];
      let current = current_tile;
      while (current !== null) {
        path.push(current);
        current = current.previousTile;
      }
      path = path.reverse();
      return [visitedTilesInOrder, path];
    }
    let children = [];
    let b = [0, 0, -1, 1];
    let c = [-1, 1, 0, 0];
    for (var a = 0; a < b.length; a++) {
      let x = current_tile.row + b[a];
      let y = current_tile.col + c[a];
      if (x > 19 || x < 0 || y > 49 || y < 0)
        continue;

      if (grid[x][y].isWall === true) 
        continue;

      let child = {
        ...grid[x][y],
        previousTile: current_tile,
      }
      children.push(child);
    }
    Mainloop:
    for (var i = 0; i < children.length; i++) {
      for (var j = 0; j < closed_list.length; j++) {  
        if (compareTile(children[i], closed_list[j]) === true) 
          continue Mainloop;
      }
      children[i].g_cost = current_tile.g_cost + 1.0;
      children[i].h_cost = calculateHAlt(children[i].row, children[i].col, finishTile.row, finishTile.col);
      children[i].f_cost = children[i].g_cost + children[i].h_cost;

      for (var open_tile in open_list) {
        if (compareTile(children[i], open_tile) === true && children[i].g_cost > open_tile.g_cost) {
          continue Mainloop;
        } 
      }
      open_list.push(children[i]);
      visitedTilesInOrder.push(children[i]);
    }
  }
}

function calculateH(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function calculateHAlt(x1, y1, x2, y2) {
  return ((x1- x2) ** 2) + ((y1 - y2) ** 2);
}

function compareTile(a, b) {
  if (a.row === b.row && a.col === b.col)
    return true;
  return false;
}

function print(grid) {
  let temp = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      if (grid[row][col].isWall === false) {
        currentRow.push(0);
      } else {
        currentRow.push(1);
      }
    }
    temp.push(currentRow);
  }
  console.log(temp);
}