const width = 1750;
const height = 920;

let screen = 'world';
const room = 1;
let movement = '';
let movetokens = 12;


// function preload() {
//     //BoardManager.preloadImages();
//     //boardMan = new BoardManager(width,height,0,0,room);
//     //boardMan.initBoard();
// }

async function setup() {
    
    createCanvas(windowWidth, windowHeight);
    initBut();
    await initBoard();
    await buildGameBits();
    turn_number = await getRoomTurn(room)

};

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

        case 'move':
            background(255);

            drawBut();
            drawBoard();
            //resources();
            nextBoatMovement()

            break;
    };
    //print(typeStruc);

};


function mouseClicked() {
    tilecoords = mouseToTile();
    if (screen == 'move' && mouseisonBoard() && board[tilecoords.i][tilecoords.j].t == 'atkboat') {
        playmoves();
        buildGameBits();
        
    } else if (screen == 'move') {
        but_action();

    } else if (screen == 'world' && mouseisonBoard()) {
        print(mouseToTile());
        print(board[tilecoords.i][tilecoords.j].id);
        print(board[tilecoords.i][tilecoords.j].t);

    } else if (screen == 'world') {
        but_action();


    } else if (screen == 'building') {
        if (mouseToTile()) {
            buildPlace();
        }
    }

};

function keysPressed() {  
    
};
/*
//Dice
let roll1=1;
let roll2=2;
let result=0;

//Dice 
function dice(diceX, diceY,roll) {

  if (roll==1) {
    fill(255, 255, 255)
    rect(diceX, diceY, 50, 50, 10)
    fill(0, 0, 0)
    text("1", diceX - 4, diceY + 5)
  }
  if (roll==2) {
    fill(255, 255, 255)
    rect(diceX, diceY, 50, 50, 10)
    fill(0, 0, 0)
    text("2", diceX - 4, diceY + 5)
  }
  if (roll==3) {
    fill(255, 255, 255)
    rect(diceX, diceY, 50, 50, 10)
    fill(0, 0, 0)
    text("3", diceX - 4, diceY + 5)
  }
  if (roll==4) {
    fill(255, 255, 255)
    rect(diceX, diceY, 50, 50, 10)
    fill(0, 0, 0)
    text("4", diceX - 4, diceY + 5)
  }
  if (roll==5) {
    fill(255, 255, 255)
    rect(diceX, diceY, 50, 50, 10)
    fill(0, 0, 0)
    text("5", diceX - 4, diceY + 5)
  }
  if (roll==6) {
    fill(255, 255, 255)
    rect(diceX, diceY, 50, 50, 10)
    fill(0, 0, 0)
    text("6", diceX - 4, diceY + 5)
  }  
}
//Dice roll 
function mouseReleased()
{
  roll1=int(random(1,7))
  roll2=int(random(1,7))
}

//Result 
function mouseClicked()
{
  result= roll1 + roll2
}
*/