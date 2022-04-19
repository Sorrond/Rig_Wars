let ResourceValue = {

    "Tokens" : 0,
    
}

function mouseToTile(){
    return { i: (int)(mouseX / Tile_W), j: (int)(mouseY / Tile_H) };
}

function mouseisonmap(){
    return mouseX > 0 && mouseX < worldMapCols * Tile_W && mouseY > 0 && mouseY < worldMapRows * Tile_H;

}

function screen_world(){
    screen = 'world';
    print(screen);
}

function building_menu(){
    screen = 'building';
    print(screen);
};


function mouseClicked() {
    tilecoords = mouseToTile();
    if(screen == 'world' && mouseisonmap()){

        print(mouseToTile())
        print(getWorldTileInfo(tilecoords.i, tilecoords.j))
        //print(worldMap[mouseToTile().i, mouseToTile().j].get_id());

    }else if(screen == 'world'){
        but_action()
        

    }else if(screen == 'building'){
        if (mouseToTile()) {
            buildPlace();
        }
    }
        
}

function resources(){
    fill('black')
    textSize(21);
    text('Tokens - ' + ResourceValue.Tokens, (width/10) * 9, (height/20));
};