let ResourceValue = {
    "Tokens": 12,
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

function screen_move() {
    screen = 'move';
    print(screen);
    movement = ''
};

async function buildGameBits() {
    try {

        let gamebits = await getGameBits();
        gamebits = gamebits.gamebits
        for (let i = 0; i < Object.keys(gamebits).length; i++) {
            console.log(i)
            if (gamebits[i].object_name == 'Oil Rig') {
                board[gamebits[i].usertile_tile_i][gamebits[i].usertile_tile_j].set_('oilrig');
                board[gamebits[i].usertile_tile_i][gamebits[i].usertile_tile_j].set_team(gamebits[i].usertile_user_id, gamebits[i].usertile_object_current_health)

            } else if (gamebits[i].object_name == 'Boat') {
                board[gamebits[i].usertile_tile_i][gamebits[i].usertile_tile_j].set_('atkboat');
                board[gamebits[i].usertile_tile_i][gamebits[i].usertile_tile_j].set_team(gamebits[i].usertile_user_id, gamebits[i].usertile_object_current_health)

            } else if (gamebits[i].object_name == 'Mine') {
                board[gamebits[i].usertile_tile_i][gamebits[i].usertile_tile_j].set_('mine');
                board[gamebits[i].usertile_tile_i][gamebits[i].usertile_tile_j].set_team(gamebits[i].usertile_user_id, gamebits[i].usertile_object_current_health)
            }
        };

    } catch (err) {
        console.log(err)
    }
};

async function damageOilRig() {

    tilecoords = mouseToTile();
    if (key == "a") {
        damage_object = await getGameBitsByTile(tilecoords.i - 1, tilecoords.j);
        destroy_gamebit = await getGameBitsByTile(tilecoords.i, tilecoords.j);
        console.log(damage_object.usertile_object_id, tilecoords.i - 1, tilecoords.j, destroy_gamebit.usertile_object_id, tilecoords.i, tilecoords.j)
        await damageObject(damage_object.usertile_object_id, tilecoords.i - 1, tilecoords.j)
        await deleteBoat(destroy_gamebit.usertile_object_id, tilecoords.i, tilecoords.j)

    } else if (key == "d") {
        damage_object = await getGameBitsByTile(tilecoords.i + 1, tilecoords.j);
        destroy_gamebit = await getGameBitsByTile(tilecoords.i, tilecoords.j);
        console.log(damage_object.usertile_object_id, tilecoords.i + 1, tilecoords.j, destroy_gamebit.usertile_object_id, tilecoords.i, tilecoords.j)
        await damageObject(damage_object.usertile_object_id, tilecoords.i + 1, tilecoords.j)
        await deleteBoat(destroy_gamebit.usertile_object_id, tilecoords.i, tilecoords.j)

    } else if (key == "w") {
        damage_object = await getGameBitsByTile(tilecoords.i, tilecoords.j - 1);
        destroy_gamebit = await getGameBitsByTile(tilecoords.i, tilecoords.j);
        console.log(damage_object.usertile_object_id, tilecoords.i, tilecoords.j - 1, destroy_gamebit.usertile_object_id, tilecoords.i, tilecoords.j)
        await damageObject(damage_object.usertile_object_id, tilecoords.i, tilecoords.j - 1)
        await deleteBoat(destroy_gamebit.usertile_object_id, tilecoords.i, tilecoords.j)

    } else if (key == "s") {
        damage_object = await getGameBitsByTile(tilecoords.i, tilecoords.j + 1);
        destroy_gamebit = await getGameBitsByTile(tilecoords.i, tilecoords.j);
        console.log(damage_object.usertile_object_id, tilecoords.i, tilecoords.j + 1, destroy_gamebit.usertile_object_id, tilecoords.i, tilecoords.j)
        await damageObject(damage_object.usertile_object_id, tilecoords.i, tilecoords.j + 1)
        await deleteBoat(destroy_gamebit.usertile_object_id, tilecoords.i, tilecoords.j)
    }
    buildGameBits();

}

async function nextTurn() {
//     let id = ;
//     console.log(id)
//     turn_number = await getRoomTurn(room)
//     turn_number ++
//     roomuser_id = await getRoomOpponentId(room, id)
//     //await newTurn(turn_number, roomuser_id, id)
//     let user_turn = await getUserTurn(room, turn_number)
//  //console.log(turn_number, user_turn, roomuser_id, id)
}
