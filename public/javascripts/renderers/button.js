let atkboat_but;
let mine_but;

function but_action() {
    if (atkboat_but.click_but(mouseX, mouseY)) {
        building_menu();
        build_atkboat();

    } else if (mine_but.click_but(mouseX, mouseY)) {
        building_menu();
        build_mine();
    }
}

function drawBut() {
    if(atkboat_but.houver_but(mouseX, mouseY)){
    fill(0, 25);
    atkboat_but.draw_but();
    }else{
    fill(0, 55);
    atkboat_but.draw_but();
    };

    if(mine_but.houver_but(mouseX, mouseY)){
    fill(0, 25);
    mine_but.draw_but();
    }else{
    fill(0, 55);
    mine_but.draw_but();
    };
}

function initBut() {
    let butsize = 100;
    
    atkboat_but = new button((width/6) * 5, (height/6) * 5, butsize * 1.5, butsize , 'Attack Boat');
    mine_but = new button((width/6) * 4, (height/6) * 5, butsize * 1.5, butsize , 'Mines');
   
}