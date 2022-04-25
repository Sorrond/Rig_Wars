
async function playmoves() {
    tilecoords = mouseToTile();

    if (key == "a" && board[tilecoords.i][tilecoords.j].t == 'atkboat') {
        if ((0 <= (tilecoords.i - 1) <= 30) && (0 <= tilecoords.j <= 14) && board[tilecoords.i - 1][tilecoords.j].t == '') {
            let gamebit_id = await getGameBitsByTile(tilecoords.i, tilecoords.j);
            gamebit_id = gamebit_id.usertile_object_id
            await moveBoatsById(tilecoords.i - 1, tilecoords.j, gamebit_id);
            board[tilecoords.i][tilecoords.j].set_default();
            buildGameBits();

            movement = 'left';
            print('left')

        } else if ((0 <= (tilecoords.i - 1) <= 30) && (0 <= tilecoords.j <= 14) && board[tilecoords.i - 1][tilecoords.j].t != '') {
            let nexttile = await getGameBitsByTile(tilecoords.i - 1, tilecoords.j);
            console.log(nexttile.usertile_object_current_health, nexttile.object_name)
            if (nexttile.object_name == 'Oil Rig' && nexttile.usertile_object_current_health === true) {
                damageOilRig();


            } else if ((nexttile.usertile_object_current_health === false) || (nexttile.object_name == 'Boat')) {

                alert('Can not move the boat in that direction')

            } else {
                alert('Cant move boat outside of the board')
            }
        }


    } else if (key == "d" && board[tilecoords.i][tilecoords.j].t == 'atkboat') {
        if ((0 <= (tilecoords.i + 1) <= 30) && (0 <= tilecoords.j <= 14) && board[tilecoords.i + 1][tilecoords.j].t == '') {
            gamebit_id = await getGameBitsByTile(tilecoords.i, tilecoords.j);
            gamebit_id = gamebit_id.usertile_object_id
            await moveBoatsById(tilecoords.i + 1, tilecoords.j, gamebit_id);
            board[tilecoords.i][tilecoords.j].set_default()
            buildGameBits()

            movement = 'right';
            print('right')
        } else if ((0 <= (tilecoords.i + 1) <= 30) && (0 <= tilecoords.j <= 14) && board[tilecoords.i + 1][tilecoords.j].t != '') {
            let nexttile = await getGameBitsByTile(tilecoords.i + 1, tilecoords.j);
            console.log(nexttile.usertile_object_current_health, nexttile.object_name)
            if (nexttile.object_name == 'Oil Rig' && nexttile.usertile_object_current_health === true) {
                damageOilRig();

            } else if ((nexttile.usertile_object_current_health === false) || (nexttile.object_name == 'Boat')) {

                alert('Can not move the boat in that direction')

            } else {
                alert('Cant move boat outside of the board')
            }
        }

    } else if (key == "w" && board[tilecoords.i][tilecoords.j].t == 'atkboat') {
        if ((0 <= (tilecoords.i) <= 30) && (0 <= tilecoords.j - 1 <= 14) && board[tilecoords.i][tilecoords.j - 1].t == '') {
            gamebit_id = await getGameBitsByTile(tilecoords.i, tilecoords.j);
            gamebit_id = gamebit_id.usertile_object_id
            await moveBoatsById(tilecoords.i, tilecoords.j - 1, gamebit_id);
            board[tilecoords.i][tilecoords.j].set_default()
            buildGameBits()
            movement = 'up';
            print('up')
        } else if ((0 <= (tilecoords.i) <= 30) && (0 <= tilecoords.j - 1 <= 14) && board[tilecoords.i][tilecoords.j - 1].t != '') {
            let nexttile = await getGameBitsByTile(tilecoords.i, tilecoords.j - 1);
            console.log(nexttile.usertile_object_current_health, nexttile.object_name)
            if (nexttile.object_name == 'Oil Rig' && nexttile.usertile_object_current_health === true) {
                damageOilRig();

            } else if ((nexttile.usertile_object_current_health === false) || (nexttile.object_name == 'Boat')) {

                alert('Can not move the boat in that direction')

            } else {
                alert('Cant move boat outside of the board')
            }
        }

    } else if (key == "s" && board[tilecoords.i][tilecoords.j].t == 'atkboat') {
        if ((0 <= (tilecoords.i) <= 30) && (0 <= tilecoords.j + 1 <= 14) && board[tilecoords.i][tilecoords.j + 1].t == '') {
            gamebit_id = await getGameBitsByTile(tilecoords.i, tilecoords.j);
            gamebit_id = gamebit_id.usertile_object_id
            await moveBoatsById(tilecoords.i, tilecoords.j + 1, gamebit_id);
            board[tilecoords.i][tilecoords.j].set_default()
            buildGameBits()

            movement = 'down';
            print('down')
        } else if ((0 <= (tilecoords.i) <= 30) && (0 <= tilecoords.j + 1 <= 14) && board[tilecoords.i][tilecoords.j + 1].t != '') {
            let nexttile = await getGameBitsByTile(tilecoords.i, tilecoords.j - 1);
            console.log(nexttile.usertile_object_current_health, nexttile.object_name)
            if (nexttile.object_name == 'Oil Rig' && nexttile.usertile_object_current_health === true) {
                damageOilRig();

            } else if ((nexttile.usertile_object_current_health === false) || (nexttile.object_name == 'Boat')) {

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
    text('Boat movement \n' + movement, (width / 6) * 2 + 75, (height / 6) * 5 + 75);

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