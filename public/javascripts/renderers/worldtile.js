let worldMap = [];

const worldMapCols = 30;
const worldMapRows = 15;

function getWorldTileInfo(i, j) {
  print(worldMap[i][j].get_id());
}

function drawWorldtiles() {

  hoveredTile = mouseToTile();

  for (let i = 0; i < worldMapCols; i++) {
    for (let j = 0; j < worldMapRows; j++) {
      let isHovering = mouseisonmap() && i == hoveredTile.i && j == hoveredTile.j;
      worldMap[i][j].draw_tile(i, j, isHovering);
    }
  }
}

function initWorldMap() {

  let countID = 1;

  for (let i = 0; i < worldMapCols; i++) {
    worldMap[i] = [];
    for (var j = 0; j < worldMapRows; j++) {
      worldMap[i][j] = new tile(countID, '');
      countID++;
    }
  }
}