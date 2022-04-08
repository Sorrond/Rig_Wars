const width = 1000;
const height = 400;
//const room = 1;

var boardMan;

function preload() {
    BoardManager.preloadImages();
    boardMan = new BoardManager(width,height,0,0,room);
    boardMan.initBoard();
}

function setup() {
    var canvas = createCanvas(width, height);
    canvas.parent('game');
}
function draw() {
    background(220);
    boardMan.draw();
}
function mouseClicked() {
    boardMan.click(mouseX,mouseY);     
}