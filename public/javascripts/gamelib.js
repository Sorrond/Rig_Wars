const width = 1750;
const height = 920;

let screen = 'world';
let movement = '';
let time = 0;
let turn_instance;

async function update() {
    time += deltaTime * 0.0002;
    console.log(int(time));
    // let turn_number

if (turn_instance != turn_number)
    if (int(time) == 1){
        time = 0;
        resources = await getResources();
        await buildGameBits();
        
    }
}

// function preload() {
//     //BoardManager.preloadImages();
//     //boardMan = new BoardManager(width,height,0,0,room);
//     //boardMan.initBoard();
// }

async function setup() {

    createCanvas(windowWidth - 15, windowHeight);
    initBut();
    await initBoard();
    await buildGameBits();
    resources = await getResources();
    turn_instance = await getRoomTurn(room1);
    console.log(turn_number.result)

};

async function draw() {
    //update();
    

    switch (screen) {
        case 'world':
            background(255);

            drawBut();
            drawBoard();
            
            break;

        case 'building':
            background(255);

            drawBut();
            drawBoard();
            

            break;

        case 'move':
            background(255);

            drawBut();
            drawBoard();
            nextBoatMovement()

            break;
        
        case 'wait':
            background(255)

            drawBoard();
    };
    resourceInfo(resources.turn_tokens_left, resources.turn_double_left);
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
        } else {
            screen = "world";
        }
    }

};

function keysPressed() {

};