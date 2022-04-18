const width = 1597;
const height = 1500;

let screen = 'world';
let time = 60;
let cancel_timer = 0;
//const room = 1;

// function preload() {
//     //BoardManager.preloadImages();
//     //boardMan = new BoardManager(width,height,0,0,room);
//     //boardMan.initBoard();
// }

function setup() {
    
    var canvas = createCanvas(width, height);
    initBut()
    initWorldMap();

    //CreateBut();
}
function draw() {
    // switch(screen){
    //         case 'building':
	// 			//background(255);
	// 			image(img[4],267,153, 1600, 800)
	// 			image(img[6],0, 910, 100, 100)
	// 			image(img[7],100, 910, 100, 100)
	// 			image(img[5],200, 910, 100, 100)
				
	// 			Create_XPBar()
	// 			resources();
			
	// 		break;

	// 		case 'citybuild':
	// 			//background(255);
	// 			if (frameCount % 60 && time != 0){
	// 				time -=5

	// 			}else if (time <= 0) {
	// 				drawBoard();
	// 				text('!!BUILDING!!', 50, 450)

	// 			}

	// 			image(img[6],0, 910, 100, 100)
	// 			image(img[7],100, 910, 100, 100)
	// 			image(img[5],200, 910, 100, 100)
	// 			Create_XPBar()
	// 			resources();
	// 		break;
    // };
    background(255);
     
    drawBut();
    drawWorldtiles();
    resources();
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