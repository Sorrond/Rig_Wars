let worldMap = [];

const worldMapCols = 30;
const worldMapRows = 15;

function getWorldTileInfo() {
  for (let i = 0; i < worldMapCols; i++) {
    for (let j = 0; j < worldMapRows; j++) {
      if (worldMap[i][j].click_tile(mouseX, mouseY)) {
        print(worldMap[i][j].get_id());

      break;
      }
    }
  }
}

function drawWorldtiles() {
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
  
  let sizeOfTile_W = 50;
  let sizeOfTile_H = 50;
  let GBW = worldMapCols * sizeOfTile_W;
  let GBH = worldMapRows * sizeOfTile_H;
  let y = 0;
  let x = 0;
  let countID = 0;
  let initialY = 0;
  let initialX = 1;

  for (let i = 0; i < worldMapCols; i++) {
    worldMap[i] = [];
    if (i == 0) {
      x = initialX;
    } else {
      x = x + GBW / worldMapCols;
    }
    for (var j = 0; j < worldMapRows; j++) {
      if (j == 0) {
        y = initialY;
      } else {
        y = y + GBH / worldMapRows;
      }
      countID++;
      worldMap[i][j] = new tile(x, y, sizeOfTile_W, sizeOfTile_H, 0, '', countID);
    }
  }
}