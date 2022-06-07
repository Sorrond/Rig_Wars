async function id() {
    let id = await getUserInfo();
    id = id.user_id
    return id;
}

async function getResources() {
    let resources = await getResourcesLeft();
    if (resources.turn_double_left){
        resources.turn_double_left = 1;
    } else {
        resources.turn_double_left = 0;
    }
    console.log(resources);
    return resources;
};

async function resourceInfo(tokens, doubles) {
    fill('white')
    textSize(21);
    text('Tokens - ' + tokens + '       Doubles - ' + doubles, (width / 10) * 8, (height / 20));
};

function screen_world() {
    screen = 'world';
    print(screen);
    movement = ''
};

function building_menu() {
    screen = 'building';
    print(screen);
    movement = ''
};

function screen_move() {
    screen = 'move';
    print(screen);
    movement = ''
};

function screen_wait() {
    screen = 'wait';
    print(screen);
    movement = ''
};

async function buildGameBits() {
    try {

        let gamebits = await getGameBits();
        gamebits = gamebits.gamebits
        for (let i = 0; i < Object.keys(gamebits).length; i++) {
            console.log(i)
            if (gamebits[i].objecttype_name == 'Oil Rig') {
                board[gamebits[i].objecttile_tile_i][gamebits[i].objecttile_tile_j].set_('oilrig');
                board[gamebits[i].objecttile_tile_i][gamebits[i].objecttile_tile_j].set_team(gamebits[i].is_player, gamebits[i].objecttile_object_current_health)

            } else if (gamebits[i].objecttype_name == 'Boat') {
                board[gamebits[i].objecttile_tile_i][gamebits[i].objecttile_tile_j].set_('atkboat');
                board[gamebits[i].objecttile_tile_i][gamebits[i].objecttile_tile_j].set_team(gamebits[i].is_player, gamebits[i].objecttile_object_current_health)

            } else if (gamebits[i].objecttype_name == 'Mine') {
                board[gamebits[i].objecttile_tile_i][gamebits[i].objecttile_tile_j].set_('mine');
                board[gamebits[i].objecttile_tile_i][gamebits[i].objecttile_tile_j].set_team(gamebits[i].is_player, gamebits[i].objecttile_object_current_health)
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
        //console.log(damage_object.objecttile_object_id, tilecoords.i - 1, tilecoords.j, destroy_gamebit.objecttile_object_id, tilecoords.i, tilecoords.j)
        await damageObject(damage_object.objecttile_object_id, tilecoords.i - 1, tilecoords.j)
        await deleteBoat(destroy_gamebit.objecttile_object_id, tilecoords.i, tilecoords.j)

    } else if (key == "d") {
        damage_object = await getGameBitsByTile(tilecoords.i + 1, tilecoords.j);
        destroy_gamebit = await getGameBitsByTile(tilecoords.i, tilecoords.j);
        //console.log(damage_object.objecttile_object_id, tilecoords.i + 1, tilecoords.j, destroy_gamebit.objecttile_object_id, tilecoords.i, tilecoords.j)
        await damageObject(damage_object.objecttile_object_id, tilecoords.i + 1, tilecoords.j)
        await deleteBoat(destroy_gamebit.objecttile_object_id, tilecoords.i, tilecoords.j)

    } else if (key == "w") {
        damage_object = await getGameBitsByTile(tilecoords.i, tilecoords.j - 1);
        destroy_gamebit = await getGameBitsByTile(tilecoords.i, tilecoords.j);
        //console.log(damage_object.objecttile_object_id, tilecoords.i, tilecoords.j - 1, destroy_gamebit.objecttile_object_id, tilecoords.i, tilecoords.j)
        await damageObject(damage_object.objecttile_object_id, tilecoords.i, tilecoords.j - 1)
        await deleteBoat(destroy_gamebit.objecttile_object_id, tilecoords.i, tilecoords.j)

    } else if (key == "s") {
        damage_object = await getGameBitsByTile(tilecoords.i, tilecoords.j + 1);
        destroy_gamebit = await getGameBitsByTile(tilecoords.i, tilecoords.j);
        //console.log(damage_object.objecttile_object_id, tilecoords.i, tilecoords.j + 1, destroy_gamebit.objecttile_object_id, tilecoords.i, tilecoords.j)
        await damageObject(damage_object.objecttile_object_id, tilecoords.i, tilecoords.j + 1)
        await deleteBoat(destroy_gamebit.objecttile_object_id, tilecoords.i, tilecoords.j)
    }
    await buildGameBits();

}

async function nextTurn() {
    let room = getCookie("roomId")
    turn_number = await getRoomTurn(room)
    turn_number++
    roomuser_opponent_id = await getRoomOpponentId(room, await id())
    await newTurn(turn_number, roomuser_opponent_id);
}