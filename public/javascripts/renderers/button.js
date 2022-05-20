let atkboat_but;
let mine_but;
let oilrig_but;
let move_but;
let end_move_but;
let end_turn;

async function but_action() {
    //if (await id() == await getUserTurn())//----------------------------------player that can play this round
    if (atkboat_but.click_but(mouseX, mouseY)) {
        building_menu();
        build_atkboat();

    } else if (mine_but.click_but(mouseX, mouseY)) {
        building_menu();
        build_mine();

    } else if (oilrig_but.click_but(mouseX, mouseY)) {
        building_menu();
        build_oilrig();

    } else if ((screen == 'world' || screen == 'building') && move_but.click_but(mouseX, mouseY)) {
        screen_move();

    } else if (screen == 'move' && end_move_but.click_but(mouseX, mouseY)) {
        screen_world();

    } else if (screen == 'world' && end_turn.click_but(mouseX, mouseY)) {
        screen_world();
        nextTurn()
    }
}

function drawBut() {
    if (atkboat_but.houver_but(mouseX, mouseY)) {
        fill(0, 25);
        atkboat_but.draw_but();
    } else {
        fill(0, 55);
        atkboat_but.draw_but();
    };

    if (mine_but.houver_but(mouseX, mouseY)) {
        fill(0, 25);
        mine_but.draw_but();
    } else {
        fill(0, 55);
        mine_but.draw_but();
    };

    if (oilrig_but.houver_but(mouseX, mouseY)) {
        fill(0, 25);
        oilrig_but.draw_but();
    } else {
        fill(0, 55);
        oilrig_but.draw_but();
    };

    if (end_turn.houver_but(mouseX, mouseY)) {
        fill(0, 25);
        end_turn.draw_but();
    } else {
        fill(0, 55);
        end_turn.draw_but();
    };

    if (screen == 'move') {
        if (end_move_but.houver_but(mouseX, mouseY)) {
            fill(0, 25);
            end_move_but.draw_but();
        } else {
            fill(0, 55);
            end_move_but.draw_but();
        };

    } else {
        if (move_but.houver_but(mouseX, mouseY)) {
            fill(0, 25);
            move_but.draw_but();
        } else {
            fill(0, 55);
            move_but.draw_but();
        };
    }
}

function initBut() {
    let butsize = 100;

    atkboat_but = new button((width / 8) * 5, (height / 6) * 5, butsize * 1.5, butsize, 'Attack Boat');
    mine_but = new button((width / 8) * 4, (height / 6) * 5, butsize * 1.5, butsize, 'Mines');
    oilrig_but = new button((width / 8) * 3, (height / 6) * 5, butsize * 1.5, butsize, 'Oil Rig');
    move_but = new button((width / 8) * 2, (height / 6) * 5, butsize * 1.5, butsize, 'Move boats');
    end_move_but = new button((width / 8) * 2, (height / 6) * 5, butsize * 1.5, butsize, 'End Move');
    end_turn = new button((width / 8) * 1, (height / 6) * 5, butsize * 1.5, butsize, 'End Turn');

}

class button {
    constructor(x, y, w, h, t) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.t = t;

    }

    draw_but() {
        push();
        stroke(0);
        rect(this.x, this.y, this.w, this.h);
        fill('black');
        textSize(16)
        textAlign(CENTER);
        text(this.t, this.x + this.w / 2, this.y + this.h / 2 + 5);
        textSize(12)
        pop();
    }


    click_but(posx, posy) {
        if ((posx > this.x & posx < this.x + this.w) & (posy > this.y & posy < this.y + this.h)) {
            return true;
        }
    }

    get_buildType() {
        return this.t;
    }

    houver_but(posx, posy) {
        if ((posx > this.x & posx < this.x + this.w) & (posy > this.y & posy < this.y + this.h)) {
            return true;
        } else {
            return false;
        };
    }

    set_(b) {
        this.t = b;
    };
}