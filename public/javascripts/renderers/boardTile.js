let board = [];

let boardCols;
let boardRows;

function drawBoard() {
  let hoveredTile = mouseToTile();
  for (let i = 0; i < boardCols; i++) {
    for (let j = 0; j < boardRows; j++) {
      let isHovering = mouseisonBoard() && i == hoveredTile.i && j == hoveredTile.j;
      board[i][j].draw_tile(i, j, isHovering);

    }
  }
}

async function initBoard() {
  try {

    //const boardCols = board.initboard_rowcols().i;
    //const boardRows = board.initboard_rowcols().j;
    let countID = 1;
    let boardsize = await getBoard();
    boardCols = boardsize.board_collum;
    boardRows = boardsize.board_row;

    for (let i = 0; i < boardCols; i++) {
      board[i] = [];
      for (var j = 0; j < boardRows; j++) {
        board[i][j] = new tile(countID, '');
        countID++;
      }
    }
  } catch (err) {
    console.log(err)
  }
}

function mouseisonBoard() {
  return mouseX > 0 && mouseX < boardCols * Tile_W && mouseY > 0 && mouseY < boardRows * Tile_H;
}


//Tile iformation related//

const Tile_W = 50;
const Tile_H = 50;

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
  getBoardTileInfo(i, j) {
    print(board[i][j].get_id());
  }

}

function mouseToTile() {
  return { i: (int)(mouseX / Tile_W), j: (int)(mouseY / Tile_H) };
}