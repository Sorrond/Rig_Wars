let worldMap = [];

const worldMapCols = 15;
const worldMapRows = 30;

function getWorldTileInfo() {

  for (let i = 0; i < worldMap.length; i++) {
    for (let j = 0; j < worldMap.length; j++) {
      if (worldMap[i][j].click_tile(mouseX, mouseY)) {
        print(worldMap[i][j].get_id());

        break;
      }
    }
  }
}

function drawWorldtiles() {
  // let worldMapCols = 15;
  // let worldMapRows = 30;
  for (let i = 0; i < worldMapCols; i++) {
    for (let j = 0; j < worldMapRows; j++) {
      if(worldMap[i][j].houver_tile(mouseX, mouseY)){
        fill(0, 25);
        worldMap[i][j].draw_tile();
      }else{
        fill(0, 55);
        worldMap[i][j].draw_tile();
      };
    }
  }
}

function initWorldMap() {

  let numberOfCols = 15;
  let numberOfrows = 30;
  let sizeOfTile_W = 50;
  let sizeOfTile_H = 50;
  let GBW = numberOfCols * sizeOfTile_W;
  let GBH = numberOfrows * sizeOfTile_H;
  let y = 0;
  let x = 0;
  let countID = 0;
  let initialY = 0;
  let initialX = 1;

  for (let i = 0; i < numberOfCols; i++) {
    worldMap[i] = [];
    if (i == 0) {
      x = initialX;
    } else {
      x = x + GBW / numberOfCols;
    }
    for (var j = 0; j < numberOfrows; j++) {
      if (j == 0) {
        y = initialY;
      } else {
        y = y + GBH / numberOfrows;
      }
      countID++;
      worldMap[i][j] = new tile(x, y, sizeOfTile_W, sizeOfTile_H, 0, '', countID);
    }
  }
}