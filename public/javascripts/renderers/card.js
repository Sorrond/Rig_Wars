const imgCenterVertical = 0.4;
const imgRelWidth = 0.6;
const textCenterVertical = 0.8;
class Card {
    static cardImages = {};
    constructor(width,height,x,y,card) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.card = card;
    }
    static initImgs(imgHash) {
        Card.cardImages = imgHash;
    } 
    draw() {
        fill(100,100,100);
        stroke(0,0,0);
        rect (this.x,this.y,this.width,this.height,5,5,5,5);
        if (this.card) {
            imageMode(CENTER);
            let img = Card.cardImages[this.card];
            let ratio = (this.width*imgRelWidth)/img.width;
            image(img,this.x+this.width/2,
                  this.y+this.height*imgCenterVertical,
                 this.width*imgRelWidth,img.height*ratio);
            fill(0,0,0);
            textAlign(CENTER,CENTER);
            text(this.card,this.x+this.width/2,this.y+this.height*textCenterVertical);
        }
    }
    setCard(card) { this.card = card; }
    getCard() { return this.card; }
    clicked(x,y) {
        return (x > this.x && x < (this.x+this.width) &&
            y > this.y && y < (this.y+this.height));
    }
}