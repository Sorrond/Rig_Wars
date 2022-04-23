let ResourceValue = {

    "Tokens" : 0,
    
}

function screen_world(){
    screen = 'world';
    print(screen);
}

function building_menu(){
    screen = 'building';
    print(screen);
};

function resources(){
    fill('black')
    textSize(21);
    text('Tokens - ' + ResourceValue.Tokens, (width/10) * 9, (height/20));
};