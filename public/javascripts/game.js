const room = sessionStorage.getItem("roomId");

window.onload = async function() {
    let userInfo = await getUserInfo();
    document.getElementById("username").innerHTML = userInfo.user_name;
    let roomId = getCookie("roomId");
    document.getElementById("roomId").innerHTML = roomId ;
    if (!room) {
        alert("No room choosen!");
        window.location="rooms.html";
    }
}


// window.onload = async function() {
//         let userInfo = await getUserInfo();
//         document.getElementById("username").innerHTML = userInfo.user_name;
//         if (!room) {
//             alert("No room choosen!");
//             window.location="rooms.html";
//         }
//     }