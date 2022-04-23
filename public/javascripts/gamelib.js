const width = 1750;
const height = 920;

let screen = 'world';
const room = 1;

// function preload() {
//     //BoardManager.preloadImages();
//     //boardMan = new BoardManager(width,height,0,0,room);
//     //boardMan.initBoard();
// }

async function setup() {

    createCanvas(windowWidth, windowHeight);
    initBut()
    await initBoard();

}
async function draw() {
    //print()

    switch (screen) {
        case 'world':
            background(255);

            drawBut();
            drawBoard();
            //resources();
            break;

        case 'building':
            background(255);

            drawBut();
            drawBoard();
            //resources();

            break;
    };
    //print(typeStruc);

}


function mouseClicked() {
    tilecoords = mouseToTile();
    if(screen == 'world' && mouseisonBoard()){

        print(mouseToTile())
        print(board[tilecoords.i][tilecoords.j].id)
        print(board[tilecoords.i][tilecoords.j].t)
        //print(worldMap[mouseToTile().i, mouseToTile().j].get_id());

    }else if(screen == 'world'){
        but_action()
        

    }else if(screen == 'building'){
        if (mouseToTile()) {
            buildPlace();
        }
    }
        
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