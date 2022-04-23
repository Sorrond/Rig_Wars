let ResourceValue = {
    "Tokens": 0,
};

function resources() {
    fill('black')
    textSize(21);
    text('Tokens - ' + ResourceValue.Tokens, (width / 10) * 9, (height / 20));
};

function screen_world() {
    screen = 'world';
    print(screen);
};

function building_menu() {
    screen = 'building';
    print(screen);
};

async function buildGameBits() {
    try {

        let gamebits = await getGameBits();
        print(gamebits)

        for (let i = 0; i < gamebits.lenght; i++) {
            if( gamebits[i].usertile_object_id == 2 ){
                board[gamebits[i].usertile_tile_i][gamebits[i].usertile_tile_j].set_('oilrig');

            }else{
                print('empty')
            }
        }
        //print(gamebits[1].usertile_user_id)

    } catch (err) {
        console.log(err)
    }
}

