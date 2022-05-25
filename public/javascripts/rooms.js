window.onload = async function() {
    let userInfo = await getUserInfo();
    document.getElementById("username").innerHTML = userInfo.user_name;   
    await fillRooms();
}

// async function fillRooms() {
//     try {   
//         let rooms = await getRooms();
//         let html = "";
//         for(let room of rooms) {
//             html+=`<section onclick=openRoom(${roomid})>
//                       <h3>${room.roo_name}</h3>
//                    </section>`
//         }
//         document.getElementById("rooms").innerHTML = html;
//     } catch (err) {
//         console.log(err);
//     }
// }

async function fillRooms() {
    try {   
        let rooms = await getRooms();
        let html = "";
        for(let room of rooms) {
            html =`<section onclick=openRoom(${1})>
                      <h3>${room.roo_name}</h3>
                   </section>`
        }
        document.getElementById("rooms").innerHTML = html;
    } catch (err) {
        console.log(err);
    }
}

function openRoom(id) {
    sessionStorage.setItem("roomId",id);
    window.location = "game.html"
}