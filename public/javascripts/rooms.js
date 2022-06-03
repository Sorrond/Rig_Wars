window.onload = async function() {
    let userInfo = await getUserInfo();
    document.getElementById("username").innerHTML = userInfo.user_name;
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

// async function fillRooms() {
//     try {
//         let rooms = await findRoom();
//         let html = "";
//         for(let room of rooms) {
//             html =`<section onclick=openRoom(${1})>
//                       <h3>${room.roo_name}</h3>
//                    </section>`
//         }
//         document.getElementById("rooms").innerHTML = html;
//     } catch (err) {
//         console.log(err);
//     }
// }

async function findGame() {
    try{
        let userId = await getUserInfo();
        console.log(userId.user_id)
        let room_id = await findRoom(userId.user_id);
        console.log(room_id)
        document.cookie = "roomId=" + room_id.result.room_id;
        window.location = "game.html"
    } catch (err) {
        console.log(err);
    }
}