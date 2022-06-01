let typeStruc ='';

function build_atkboat(){
    print('atkboat');
    typeStruc = 'atkboat';
    
};

function build_oilrig(){
    print('oilrig');
    typeStruc = 'oilrig';
    
};

function build_mine(){
    print('mine');
    typeStruc = 'mine';
    
};

async function buildPlace(){
    if (mouseToTile()) {

        //Build a object in a space that is different than a object//
        tilecoords = mouseToTile();
        
        if(typeStruc=='atkboat' && board[tilecoords.i][tilecoords.j].get_buildType() == ''){
            await createGamebits(2, tilecoords.i, tilecoords.j);
            //board[tilecoords.i][tilecoords.j].set_(typeStruc);
            // print(board[tilecoords.i][tilecoords.j].get_id());
            await buildGameBits();
            screen_world()


        //Build a mine in a space that is different than a mine//
        }else if(typeStruc =='mine' && board[tilecoords.i][tilecoords.j].get_buildType() == ''){
            await createGamebits(3, tilecoords.i, tilecoords.j);
            await buildGameBits();
            // board[tilecoords.i][tilecoords.j].set_(typeStruc);
            // print(board[tilecoords.i][tilecoords.j].get_id());
            screen_world()

        }else if(typeStruc =='oilrig' && board[tilecoords.i][tilecoords.j].get_buildType() == '' && board[tilecoords.i][tilecoords.j + 1].get_buildType() == '' && board[tilecoords.i][tilecoords.j + 2].get_buildType() == ''){
            await createGamebits(1, tilecoords.i, tilecoords.j);
            await buildGameBits();
                // board[tilecoords.i][tilecoords.j].set_(typeStruc);
                // board[tilecoords.i][tilecoords.j + 1].set_(typeStruc);
                // board[tilecoords.i][tilecoords.j + 2].set_(typeStruc);
                // print(board[tilecoords.i][tilecoords.j].get_id());
                screen_world()
            
        }else if((typeStruc == board[tilecoords.i][tilecoords.j].get_buildType() )||( board[tilecoords.i][tilecoords.j].get_buildType() == 'oilrig' && worldMap[tilecoords.i][tilecoords.j + 1].get_buildType() == 'oilrig' && board[tilecoords.i][tilecoords.j + 2].get_buildType() == 'oilrig' )){
            print(`Can't build ${typeStruc}, in that position.`)
            print(board[tilecoords.i][tilecoords.j].get_id());
            screen_world()


        }else{
            print(`Can't build ${typeStruc}, not enough tokens`)
            print(board[tilecoords.i][tilecoords.j].get_id());
            screen_world()
        }
    } else {
        screen = "world";
    }
};