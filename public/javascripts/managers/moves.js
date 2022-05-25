/*function canMove(){
    if (dice +1){
        canMove== true;
    }else if(dice == 0){
        canMove ==false;
        print("you have no more moves");~
    }
}*/

async function playmoves() { 
    tilecoords = mouseToTile();

    /*if(mouseClicked && board[tilecoords.i][tilecoords.j].t == 'atkboat' && canMove == true) {
        tilecoords[i].move();
        tilecoords[j].move();
        
        move()
            coords.i = moveBoatsById(gamebit_id); or mouseclick again?
            coords.j = moveBoatsById(gamebit_id); or mouseclick again?
        */

    if (key == "a" && board[tilecoords.i][tilecoords.j].t == 'atkboat') {
        if ((0 <= (tilecoords.i - 1) <= 30) && (0 <= tilecoords.j <= 14) && board[tilecoords.i - 1][tilecoords.j].t == '') {
            let gamebit_id = await getGameBitsByTile(tilecoords.i, tilecoords.j);
            gamebit_id = gamebit_id.objecttile_object_id
            await moveBoatsById(tilecoords.i - 1, tilecoords.j, gamebit_id);
            board[tilecoords.i][tilecoords.j].set_default();
            await buildGameBits();

            movement = 'l-eft';
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

}
