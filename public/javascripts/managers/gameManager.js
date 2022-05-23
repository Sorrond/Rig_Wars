async function id() {
    let id = await getUserInfo();
    id = id.user_id
    return id;
}

async function getResources() {
    let resources = await getResourcesLeft();
    return resources;
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
    turn_number = await getRoomTurn(room)
    turn_number++
    roomuser_opponent_id = await getRoomOpponentId(room, await id())

    result = RollDice()


    await newTurn(turn_number, roomuser_opponent_id, result[0], result[1])

    // only info for the devs
    console.log(result[1], result[0])
    console.log(await id(), turn_number, roomuser_opponent_id)
    let user_turn = await getUserTurn(room, turn_number)
    console.log(turn_number, user_turn, turn_roomuser_id, id)
    // ---
}


// Dice

function RollDice() {
    //implement in a way that every turn pass, it rolls by itself and saves automaticaly inside DB so no exploits can happen
    let roll1;
    let roll2;
    let result = [];

    //Dice 
    roll1 = int(random(1, 7))
    roll2 = int(random(1, 7))
    if (roll1 == roll2) {
        result[1] = true
        print("You have a double to spend")
    } else {
        result[1] = false
        print("You don't have any more doubles to spend")
    }

    //Result 
    result[0] = roll1 + roll2
    print("Your rolls are " + roll1 + " " + roll2 + " your points are: " + result)

    return result;
}