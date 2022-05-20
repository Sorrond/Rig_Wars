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

    fill(255, 0, 0);
    rect(((Tile_W * boardCols)/2) - 5, 0, 5, Tile_H * boardRows)
}

async function initBoard() {
  try {
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

const Tile_W = 50/1.2;
const Tile_H = 50/1.2;

class tile {

  constructor(id, t) {

    this.id = id;
    this.t = t;
    this.team;

  }

  draw_tile(i, j, isHovering) {
    push();
    stroke(0)
    if (isHovering) {
      fill(0, 25);
    } else if (this.team == 'red') {
      fill(255, 0, 0);
    } else if (this.team == 'darkred') {
      fill(60, 0, 0);
    } else if (this.team == 'blue') {
      fill(0, 0, 255);
    } else if (this.team == 'darkblue') {
      fill(0, 0, 60);
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

  set_default() {
    this.t = ''
    this.team = ''
  };

  set_team(team, health) {
    print(health)
    if (team == false && health == true) {
      this.team = 'red'

    } else if (team == false && health == false) {
      this.team = 'darkred'

    } else if (team == true && health == true) {
      this.team = 'blue'

    } else if (team == true && health == false) {
      this.team = 'darkblue'
    }
  }

}

function mouseToTile() {
  return { i: (int)(mouseX / Tile_W), j: (int)(mouseY / Tile_H) };
}