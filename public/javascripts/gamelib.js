const width = 1000;
const height = 400;
//const room = 1;

var boardMan;

function preload() {
    BoardManager.preloadImages();
    //boardMan = new BoardManager(width,height,0,0,room);
    //boardMan.initBoard();
}

function setup() {
    var canvas = createCanvas(width, height);
}
function draw() {
    background(255);
}
function mouseClicked() {
    boardMan.click(mouseX,mouseY);     
}


/*----------------------------------------------------------------------------*/

// Board try outs

// var squares = [];
// var tile_y = 30 * 50
// var tile_x = 15 * 50

// function setup() {
//   createCanvas(755, 1500);

//   // Create the squares
//   for (y = 0; y < tile_y; y += 50) {
//     for (x = 0; x < tile_x; x += 50) {
//       square = new Square(x, y);
//       squares.push(square);
//     }
//   }
//   background(255);
//   drawBoard();
// }

// // Function just for drawing the board
// function drawBoard() {
//   blue = (240,248,255);
//   white = 30;
//   for (y = 0; y < tile_y; y += 50) {
//     for (x = 0; x < tile_x; x += 50) {
//       if (x % 100 == 0) {
//         if (y % 100 == 0) {
//           fill(blue);
//         }
//         if (y % 100 == 50) {
//           fill(white);
//         }
//       }
//       if (x % 100 == 50) {
//         if (y % 100 == 50) {
//           fill(blue);
//         }
//         if (y % 100 == 0) {
//           fill(white);
//         }
//       }

//       rect(x, y, 50, 50);
//     }
//   }
// }