window.onload = async function() {
    let userInfo = await getUserInfo();
    document.getElementById("username").innerHTML = userInfo.user_name;
}

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