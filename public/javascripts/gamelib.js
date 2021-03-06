const width = 1750;
const height = 920;

let screen = 'world';
let movement = '';
let time = 0;
let turn_instance;

let oil_rigs_img = [];
let atkboat = [];
let mark;
let board_img;
let bg;
let buttons = [];
let mine;

function preload() {
    for (let i = 0; i < 2; i++) {
        oil_rigs_img[i] = loadImage(`images/assets/oil_rig_${i}.png`);
        atkboat[i] = loadImage(`images/assets/barco_${i}.png`);

    }
    for (let i = 0; i < 6; i++) {
        buttons[i] = loadImage(`images/assets/button_${i}.png`);
    }
    mark = loadImage(`images/assets/mark.png`);
    board_img = loadImage(`images/assets/board.png`);
    bg = loadImage(`images/assets/background.png`);
    mine = loadImage(`images/assets/mine.png`);
}

async function setup() {

    createCanvas(windowWidth - 15, windowHeight);

    initBut();
    await initBoard();
    await buildGameBits();
    resources = await getResources();
    turn_instance = await getRoomTurn();
    //console.log(turn_number.result)

}

async function update() {

    //let turn_number
    //console.log(turn_instance)
    if (turn_instance == 0) {
        time += deltaTime * 0.0002;
        if (int(time) == 1) {
            time = 0;
            resources = await getResources();
            // await buildGameBits();
            await checkSetup();

        }
    } else {
        time += deltaTime * 0.0002;
        if (int(time) == 1) {
            time = 0;
            resources = await getResources();
            await buildGameBits();
            let result = await checkHealth();
            console.log(result)
            if (result == true) {
                alert("Sorry you lost this time!\nThanks for playing.");
                window.location = "rooms.html";
            } else if (result == false) {
                alert("You won the game!\nThanks for playing.");
                window.location = "rooms.html";
            }
        }
    }
}

async function draw() {
    //update()
    background(bg);

    switch (screen) {
        case 'world':
            image(board_img, pos_x_init, pos_y_init, board_img.width / 5 * 3 + 2, board_img.height / 5 * 3);
            drawBut();
            drawBoard();
            break;

        case 'building':
            image(board_img, pos_x_init, pos_y_init, board_img.width / 5 * 3 + 2, board_img.height / 5 * 3);
            drawBut();
            drawBoard();


            break;

        case 'move':
            image(board_img, pos_x_init, pos_y_init, board_img.width / 5 * 3 + 2, board_img.height / 5 * 3);
            drawBut();
            drawBoard();
            nextBoatMovement()

            break;

        case 'wait':
            update()

            drawBoard();
    };
    resourceInfo(resources.turn_tokens_left, resources.turn_double_left);

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