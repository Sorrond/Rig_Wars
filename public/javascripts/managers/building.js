let typeStruc ='';

function build_atkboat(){
    print('atkboat');
    typeStruc = 'atkboat';
    
};

function build_mine(){
    print('mine');
    typeStruc = 'mine';
    
};

function buildPlace(){
            if (mouseToTile()) {

                //Build a atkboat in a space that is different than a atkboat//
                tilecoords = mouseToTile();


                if(typeStruc=='atkboat' && worldMap[tilecoords.i][tilecoords.j].t != 'atkboat'){
                    worldMap[tilecoords.i][tilecoords.j].set_(typeStruc);
                    print(worldMap[tilecoords.i][tilecoords.j].get_id());
                    screen_world()


                //Build a mine in a space that is different than a mine//
                }else if(typeStruc =='mine' && worldMap[tilecoords.i][tilecoords.j].t != 'mine'){
                    worldMap[tilecoords.i][tilecoords.j].set_(typeStruc);
                    print(worldMap[tilecoords.i][tilecoords.j].get_id());
                    screen_world()
                    

                }else if(typeStruc == worldMap[i][j].t){
                    print(`Can't build there`)
                    print(worldMap[i][j].get_id());
                    screen_world()


                }else{
                    print(`Can't build ${typeStruc}, not enough tokens`)
                    print(worldMap[i][j].get_id());
                    
                }
    }
};