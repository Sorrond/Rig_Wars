let ResourceValue = {

    "Tokens" : 0,
    
}

// function screen_LoginTrue(){
//     screen = 'city';
//     print(screen);

//     loginbut.hide()
//     login_username.hide()
//     login_password.hide()

//     registerbut.hide()
//     register_username.hide()
//     register_email.hide()
//     register_password.hide()

//     worldbut.show()
// 	citybut.show()
// 	buildbut.show()

// };

function screen_world(){
    screen = 'world';
    print(screen);
    hidebut_buildingTab()
    time = 60
}

function building_menu(){
    screen = 'building';
    showbut_buildingTab();
    time=60
};


function mouseClicked() {
    if(screen == 'world'){
        for (let i = 0; i < worldMapCols; i++) {
            for (let j = 0; j < worldMapRows; j++) {
                if (worldMap[i][j].click_tile(mouseX, mouseY)) {

                    getWorldTileInfo()
                
                break;
                }
            }
        }
    }else if(screen == 'building'){
        for (let i = 0; i < worldMapCols; i++) {
            for (let j = 0; j < worldMapRows; j++) {
                if (worldMap[i][j].click_tile(mouseX, mouseY)) {
                    buildPlace();
                    break;
                }
            }
        }
    }
}

function resources(){
    fill('black')
    textSize(21);
    text('Tokens - ' + ResourceValue.Tokens, (width/10) * 9, (height/20));
};