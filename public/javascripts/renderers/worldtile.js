// let worldMap = [];

// let worldMapCols;
// let worldMapRows;

// function getWorldTileInfo(i, j) {
//   print(worldMap[i][j].get_id());
// }

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



const Tile_W = 50;
const Tile_H = 50;

let worldMap = [];

let worldMapCols;
let worldMapRows;

class tile {


  constructor(id, t) {

    this.id = id;
    this.t = t;

  }

  draw_tile(i, j, isHovering) {
    push();
    stroke(0);

    if (isHovering) {
      fill(0, 25);
    } else {
      fill(0, 50);
    }
    rect(i * Tile_W, j * Tile_H, Tile_W, Tile_H);
    fill('white');
    textSize(16)
    textAlign(CENTER);
    text(this.t, i * Tile_W + Tile_W / 2, j * Tile_H + Tile_H / 2);
    textSize(12)
    pop();
  }

  get_id() {
    return this.id;
  }

  get_buildType() {
    return this.t;
  }

  set_(b) {
    this.t = b;
  };

  //------------------------------------------------
  getWorldTileInfo(i, j) {
    print(worldMap[i][j].get_id());
  }

  // drawWorldtiles() {
  //   let hoveredTile = mouseToTile();
  //   for (let i = 0; i < worldMapCols; i++) {
  //     for (let j = 0; j < worldMapRows; j++) {
  //       let isHovering = mouseisonmap() && i == hoveredTile.i && j == hoveredTile.j;
  //       worldMap[i][j].draw_tile(i, j, isHovering);
  //     }
  //   }
  // }

  // async initWorldMap() {
  //   try {

  //     //const worldMapCols = board.initboard_rowcols().i;
  //     //const worldMapRows = board.initboard_rowcols().j;
  //     let countID = 1;
  //     let board = await getBoard();
  //     worldMapCols = board.board_collum;
  //     worldMapRows = board.board_row;

  //     for (let i = 0; i < worldMapCols; i++) {
  //       worldMap[i] = [];
  //       for (var j = 0; j < worldMapRows; j++) {
  //         worldMap[i][j] = new tile(countID, '');
  //         countID++;
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }

  // }

}