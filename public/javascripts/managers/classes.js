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

    if (isHovering){
      fill(0, 25);
    }else{
      fill(0, 50);
    }
    rect(i * Tile_W, j * Tile_H, Tile_W, Tile_H);
    fill('white');
    textSize(16)
    textAlign(CENTER);
    text(this.t, i * Tile_W + Tile_W/2, j * Tile_H + Tile_H/2);
    textSize(12)
    pop();
  }

  get_id() {
    return this.id;
  }
  
  get_buildType() {
    return this.t;
  }

  set_(b){
    this.t = b;
  };
}


class button {
  constructor(x, y, w, h, t) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.t = t;

  }

  draw_but() {
    push();
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
    fill('black');
    textSize(16)
    textAlign(CENTER);
    text(this.t, this.x + this.w/2,this.y + this.h/2 + 5);
    textSize(12)
    pop();
  }


  click_but(posx, posy) {
    if ((posx > this.x & posx < this.x + this.w) & (posy > this.y & posy < this.y + this.h)) {
      return true;
    }
  }

  get_buildType() {
    return this.t;
  }

  houver_but(posx, posy) {
      if ((posx > this.x & posx < this.x + this.w) & (posy > this.y & posy < this.y + this.h)) {
          return true;
      }else{
          return false;
      };
  }

  set_(b){
    this.t = b;
  };
}
