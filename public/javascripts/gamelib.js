const width = 1750;
const height = 920;

let screen = 'world';
//const room = 1;
let movement = '';
let movetokens = 12;


// function preload() {
//     //BoardManager.preloadImages();
//     //boardMan = new BoardManager(width,height,0,0,room);
//     //boardMan.initBoard();
// }

async function setup() {
    
    createCanvas(windowWidth - 50, windowHeight);
    initBut();
    await initBoard();
    await buildGameBits();
    await getResources();
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