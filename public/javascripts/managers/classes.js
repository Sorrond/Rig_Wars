class tile {
  constructor(x, y, w, h, st, t, id) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.st = st;
    this.t = t;
    this.id = id;

  }

  draw_tile() {
    push();
    stroke(this.st);
    rect(this.x, this.y, this.w, this.h);
    fill('white');
    textSize(16)
    text(this.t, this.x, this.y + this.h / 2);
    textSize(12)
    pop();
  }


  click_tile(posx, posy) {
    if ((posx > this.x & posx < this.x + this.w) & (posy > this.y & posy < this.y + this.h)) {
      return true;
    }
  }


  get_id() {
    return this.id;
  }
  

  get_buildType() {
    return this.t;
  }

  houver_tile(posx, posy) {
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
    text(this.t, this.x + this.w/2,this.y +this.h/2 + 5);
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
