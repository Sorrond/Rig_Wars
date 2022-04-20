function playmoves(){
    tilecoords = mouseToTile();
    if (mouseToTile() && worldMap[tilecoords.i][tilecoords.j].get_buildType() == 'atkboat') {
        prevtile = mouseToTile()
        //Move a atkboat//
    
        if(typeStruc=='atkboat' && worldMap[tilecoords.i][tilecoords.j].get_buildType() == ''){
            worldMap[tilecoords.i][tilecoords.j].set_(typeStruc);
            print(worldMap[tilecoords.i][tilecoords.j].get_id());
            screen_world()

        }else{
            print(`Can't move ${typeStruc}, not enough tokens`)
            print(worldMap[tilecoords.i][tilecoords.j].get_id());
            screen_world()
        }

    }else{
        print(`Can't move ${typeStruc}.`)
        print(worldMap[tilecoords.i][tilecoords.j].get_id());
        screen_world()
    }
};