let worldMap = [];

let worldMapCols;
let worldMapRows;

function getWorldTileInfo(i, j) {
  print(worldMap[i][j].get_id());
}

function drawWorldtiles() {
  let hoveredTile = mouseToTile();
  for (let i = 0; i < worldMapCols; i++) {
    for (let j = 0; j < worldMapRows; j++) {
      let isHovering = mouseisonmap() && i == hoveredTile.i && j == hoveredTile.j;
      worldMap[i][j].draw_tile(i, j, isHovering);
    }
  }
}

async function initWorldMap() {
  try {

    //const worldMapCols = board.initboard_rowcols().i;
    //const worldMapRows = board.initboard_rowcols().j;
    let countID = 1;
    let board = await getBoard();
    worldMapCols = board.board_collum;
    worldMapRows = board.board_row;

    for (let i = 0; i < worldMapCols; i++) {
      worldMap[i] = [];
      for (var j = 0; j < worldMapRows; j++) {
        worldMap[i][j] = new tile(countID, '');
        countID++;
      }
    }
  } catch (err) {
    console.log(err)
  }

}