let typeStruc ='';

function build_atkboat(){
    print('atkboat')
    typeStruc = 'atkboat';
};
function build_mine(){
    print('mine')
    typeStruc = 'mine';
};

function buildPlace(){
    for (let i = 0; i < worldMapCols; i++) {
        for (let j = 0; j < worldMapRows; j++) {
            if (worldMap[i][j].click_tile(mouseX, mouseY)) {

                //Build a atkboat in a space that is different than a atkboat//
                if(typeStruc=='atkboat' && worldMap[i][j].t != 'atkboat'){
                    worldMap[i][j].set_(typeStruc);
                    print(worldMap[i][j].get_id());
                    break;


                //Build a mine in a space that is different than a mine//
                }else if(typeStruc =='mines' && worldMap[i][j].t != 'mines'){
                    worldMap[i][j].set_(typeStruc);
                    print(worldMap[i][j].get_id());
                    break;


                }else if(typeStruc == worldMap[i][j].t ){
                    print(`Can't build there`)
                    print(worldMap[i][j].get_id());
                    time=0
                    break;


                }else{
                    print(`Can't build ${typeStruc}, not enough tokens`)
                    print(worldMap[i][j].get_id());
                    time=0
                    break;
                }
            }
        }
    }
};