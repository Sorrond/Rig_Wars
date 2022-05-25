
async function playmoves() {
    tilecoords = mouseToTile();

    if (key == "a" && board[tilecoords.i][tilecoords.j].t == 'atkboat') {
        if ((0 <= (tilecoords.i - 1) <= 30) && (0 <= tilecoords.j <= 14) && board[tilecoords.i - 1][tilecoords.j].t == '') {
            let gamebit_id = await getGameBitsByTile(tilecoords.i, tilecoords.j);
            gamebit_id = gamebit_id.objecttile_object_id
            await moveBoatsById(tilecoords.i - 1, tilecoords.j, gamebit_id);
            console.log(moveBoatsById(tilecoords.i - 1, tilecoords.j, gamebit_id))
            board[tilecoords.i][tilecoords.j].set_default();
            await buildGameBits();

            movement = 'left';
            print('left')

        } else if ((0 <= (tilecoords.i - 1) <= 30) && (0 <= tilecoords.j <= 14) && board[tilecoords.i - 1][tilecoords.j].t != '') {
            let nexttile = await getGameBitsByTile(tilecoords.i - 1, tilecoords.j);
            console.log(nexttile.objecttile_object_current_health, nexttile.objecttype_name)
            if (nexttile.objecttype_name == 'Oil Rig' && nexttile.objecttile_object_current_health === true) {
                board[tilecoords.i][tilecoords.j].set_default();
                damageOilRig();


            } else if ((nexttile.objecttile_object_current_health === false) || (nexttile.objecttype_name == 'Boat')) {

                alert('Can not move the boat in that direction')

            } else {
                alert('Cant move boat outside of the board')
            }
        }


    } else if (key == "d" && board[tilecoords.i][tilecoords.j].t == 'atkboat') {
        if ((0 <= (tilecoords.i + 1) <= 30) && (0 <= tilecoords.j <= 14) && board[tilecoords.i + 1][tilecoords.j].t == '') {
            gamebit_id = await getGameBitsByTile(tilecoords.i, tilecoords.j);
            gamebit_id = gamebit_id.objecttile_object_id
            await moveBoatsById(tilecoords.i + 1, tilecoords.j, gamebit_id);
            board[tilecoords.i][tilecoords.j].set_default()
            await buildGameBits()

            movement = 'right';
            print('right')
        } else if ((0 <= (tilecoords.i + 1) <= 30) && (0 <= tilecoords.j <= 14) && board[tilecoords.i + 1][tilecoords.j].t != '') {
            let nexttile = await getGameBitsByTile(tilecoords.i + 1, tilecoords.j);
            console.log(nexttile.objecttile_object_current_health, nexttile.objecttype_name)
            if (nexttile.objecttype_name == 'Oil Rig' && nexttile.objecttile_object_current_health === true) {
                board[tilecoords.i][tilecoords.j].set_default();
                await damageOilRig();

            } else if ((nexttile.objecttile_object_current_health === false) || (nexttile.objecttype_name == 'Boat')) {

                alert('Can not move the boat in that direction')

            } else {
                alert('Cant move boat outside of the board')
            }
        }

    } else if (key == "w" && board[tilecoords.i][tilecoords.j].t == 'atkboat') {
        if ((0 <= (tilecoords.i) <= 30) && (0 <= tilecoords.j - 1 <= 14) && board[tilecoords.i][tilecoords.j - 1].t == '') {
            gamebit_id = await getGameBitsByTile(tilecoords.i, tilecoords.j);
            gamebit_id = gamebit_id.objecttile_object_id
            await moveBoatsById(tilecoords.i, tilecoords.j - 1, gamebit_id);
            board[tilecoords.i][tilecoords.j].set_default()
            await buildGameBits()
            movement = 'up';
            print('up')
        } else if ((0 <= (tilecoords.i) <= 30) && (0 <= tilecoords.j - 1 <= 14) && board[tilecoords.i][tilecoords.j - 1].t != '') {
            let nexttile = await getGameBitsByTile(tilecoords.i, tilecoords.j - 1);
            console.log(nexttile.objecttile_object_current_health, nexttile.objecttype_name)
            if (nexttile.objecttype_name == 'Oil Rig' && nexttile.objecttile_object_current_health === true) {
                board[tilecoords.i][tilecoords.j].set_default();
                await damageOilRig();

            } else if ((nexttile.objecttile_object_current_health === false) || (nexttile.objecttype_name == 'Boat')) {

                alert('Can not move the boat in that direction')

            } else {
                alert('Cant move boat outside of the board')
            }
        }

    } else if (key == "s" && board[tilecoords.i][tilecoords.j].t == 'atkboat') {
        if ((0 <= (tilecoords.i) <= 30) && (0 <= tilecoords.j + 1 <= 14) && board[tilecoords.i][tilecoords.j + 1].t == '') {
            gamebit_id = await getGameBitsByTile(tilecoords.i, tilecoords.j);
            gamebit_id = gamebit_id.objecttile_object_id
            await moveBoatsById(tilecoords.i, tilecoords.j + 1, gamebit_id);
            board[tilecoords.i][tilecoords.j].set_default()
            await buildGameBits()

            movement = 'down';
            print('down')
        } else if ((0 <= (tilecoords.i) <= 30) && (0 <= tilecoords.j + 1 <= 14) && board[tilecoords.i][tilecoords.j + 1].t != '') {
            let nexttile = await getGameBitsByTile(tilecoords.i, tilecoords.j - 1);
            console.log(nexttile.objecttile_object_current_health, nexttile.objecttype_name)
            if (nexttile.objecttype_name == 'Oil Rig' && nexttile.objecttile_object_current_health === true) {
                board[tilecoords.i][tilecoords.j].set_default();
                await damageOilRig();

            } else if ((nexttile.objecttile_object_current_health === false) || (nexttile.objecttype_name == 'Boat')) {

                alert('Can not move the boat in that direction')

            } else {
                alert('Cant move boat outside of the board')
            }
        }
    }
};

function nextBoatMovement() {

    fill('black');
    textSize(15)
    textAlign(CENTER);
    text('Boat movement \n' + movement, (width / 10) * 7.4 + (100*4)/2, (height / 6) * 4 + 75);

    if (keysPressed) {
        if (key == "a") {
            movement = 'left';

        } else if (key == "d") {
            movement = 'right';

        } else if (key == "w") {
            movement = 'up';

        } else if (key == "s") {
            movement = 'down';

        }
    }

   /* if(mousec){
    if (locked) {
        bx = mouseX - xOffset;
        by = mouseY - yOffset;
      }
    }
    
    switch(boat) NO TOCAR NO TRABALHO DO FARINHA
        case 0:
        if boat j or x + 1 then
            print("you moved one 1")
        break;

        case 1:
            if boat j or x + 2 then
            print("you moved one 2")
        break;

        case 2:
            if boat j or x + 3 then
            print("you moved one 3")
        break;

        case 3:
            if boat j or x + 4 then
            print("you moved one 4")
        break;

        case 4:
            if boat j or x + 5 then
            print("you moved one 5")
        break;

        case 5:
            if boat j or x + 6 then
            print("you moved one 6")
        break;

        case 6:
            if boat j or x + 7 then
            print("you moved one 7")
        break;

        case 7:
            if boat j or x + 8 then
            print("you moved one 8")
        break;

        case 8:
            if boat j or x + 9 then
            print("you moved one 9")
        break;

        case 9:
            if boat j or x + 10 then
            print("you moved one 10")
        break;

        case 10:
            if boat j or x + 11 then
            print("you moved one 11")
        break;

        case 11:
            if boat j or x + 12 then
            print("you moved one 12")
        break;

        case 12:
            if boat j or x + 13 then
            print("you dont have enough to move here")
        break;
}*/
}