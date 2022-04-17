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

                //Build a storage in a space that is different than a storage//
                if(typeStruc=='atkboat' && worldMap[i][j].t != 'atkboat'){
                    worldMap[i][j].set_(typeStruc);
                    print(worldMap[i][j].get_id());
                    break;


                //Build a house in a space that is different than a house//
                }else if(typeStruc =='mines' && worldMap[i][j].t != 'mines'){
                    worldMap[i][j].set_(typeStruc);
                    print(worldMap[i][j].get_id());
                    break;


                }else if(typeStruc == worldMap[i][j].t ){
                    alert(`Can't build there`)
                    print(worldMap[i][j].get_id());
                    time=0
                    break;


                }else{
                    alert(`Can't build ${typeStruc}, not enough resources`)
                    print(worldMap[i][j].get_id());
                    time=0
                    break;
                }
            }
        }
    }
};