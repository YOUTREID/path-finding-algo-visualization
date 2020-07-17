export function dijkstra(grid, startTile, finishTile) {
  const visitedTilesInOrder = [];
  startTile.distance = 0;
  const unvisitedTiles = getAllTiles(grid);
  while (unvisitedTiles.length) {
    sortTilesByDistance(unvisitedTiles);
    const closestTile = unvisitedTiles.shift();
    if (closestTile.isWall) continue;
    if (closestTile.distance === Infinity) return visitedTilesInOrder;
    closestTile.isVisited = true;
    visitedTilesInOrder.push(closestTile);
    if (closestTile === finishTile) return visitedTilesInOrder;
    updateUnvisitedNeighbors(closestTile, grid);
  }
}

function sortTilesByDistance(unvisitedTiles) {
  unvisitedTiles.sort((TileA, TileB) => TileA.distance - TileB.distance);
}

function updateUnvisitedNeighbors(tile, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(tile, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = tile.distance + 1;
    neighbor.previousTile = tile;
  }
}

function getUnvisitedNeighbors(tile, grid) {
  const neighbors = [];
  const { col, row } = tile;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllTiles(grid) {
  const Tiles = [];
  for (const row of grid) {
    for (const tile of row) {
      Tiles.push(tile);
    }
  }
  return Tiles;
}

export function getTilesInShortestPathOrder(finishTile) {
  const TilesInShortestPathOrder = [];
  let currentTile = finishTile;
  while (currentTile !== null) {
    TilesInShortestPathOrder.unshift(currentTile);
    currentTile = currentTile.previousTile;
  }
  return TilesInShortestPathOrder;
}
