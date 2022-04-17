let worldMap = [];

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
  for (let i = 0; i < worldMap.length; i++) {
    for (let j = 0; j < worldMap.length; j++) {
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
  let sizeOfTile_W = 106;
  let sizeOfTile_H = 53;
  let GBW = 2133-2133/5;
  let GBH = 1041-1041/6;
  let y = 0;
  let x = 0;
  let countID = 0;
  let initialY = 145;
  let initialX = 350;

  for (let i = 0; i < numberOfCols; i++) {
    worldMap[i] = [];
    if (i == 0) {
      y = initialY;
    } else {
      y = y + GBH / numberOfCols;
    }
    for (var j = 0; j < numberOfCols; j++) {
      if (j == 0) {
        x = initialX;
      } else {
        x = x + GBW / numberOfCols;
      }
      countID++;
      worldMap[i][j] = new tile(x, y, sizeOfTile_W, sizeOfTile_H, 0, '', countID);
    }
  }
}