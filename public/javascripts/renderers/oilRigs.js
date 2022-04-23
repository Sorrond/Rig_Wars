

class oilrig {

    constructor(i,j) {
  
      this.x = i * Tile_W;
      this.y = j * Tile_H;
  
    }
  
    draw_oilrig(i, j, isHovering) {
      push();
      stroke(0);
  
      if (isHovering) {
        fill(0, 25);
      } else {
        fill(0, 50);
      }
      rect(x, y, 50, 150);
      fill('red');
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