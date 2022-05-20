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
//implement in a way that every turn start, it rolls by itself, so no mouse click
//Dice
let roll1=1;
let roll2=2;
let result=0;

//Dice 
function newTurn(){
  if newTurn
  then
    roll1=int(random(1,7))
    roll2=int(random(1,7))
}

//Result 
function showResult()
{
  result= roll1 + roll2
  print("your points are:" + result)
}
*/