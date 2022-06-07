async function getRoom(roomId) {
    try {
        const response = await fetch(`/api/rooms/${roomId}`);
        if (response.status == 200) {
            var room = await response.json();
            return room;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function getRoomTurn() {
    try {
        const response = await fetch(`/api/rooms/${getCookie("roomId")}`);
        if (response.status == 200) {
            var result = await response.json();
            result = result.turn_n
            return result;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function getRoomOpponentId(id) {
    try {
        const response = await fetch(`/api/rooms/opponent/${getCookie("roomId")}/${id}`);
        if (response.status == 200) {
            var result = await response.json();
            result = result.rows[0].roomuser_id
            return result;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function deleteBoat(gamebit_id, gamebit_tile_i, gamebit_tile_j) {
    try {
        //console.log(tile_i, tile_j, gamebit_id)
        const response = await fetch(`/api/board/gamebits/id/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ gamebit_id: gamebit_id, gamebit_tile_i: gamebit_tile_i, gamebit_tile_j: gamebit_tile_j })
        });
        var result = await response.json();
        return { success: response.status == 200, result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function newTurn(turn_number, roomuser_id, user, tokens, double) {
    try {
        const response = await fetch(`/api/rooms/${getCookie("roomId")}/newturn`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ turn_number: turn_number, roomuser_id: roomuser_id, tokens: tokens, double: double, user:user})
        });
        var result = await response.json();
        return { success: response.status == 200, result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}


async function getUserTurn(turn) {
    try {
        const response = await fetch(`/api/rooms/${getCookie("roomId")}/${turn}`);
        if (response.status == 200) {
            var result = await response.json();
            result = result.rows[0].roomuser_user_id
            return result;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function findRoom(playerID) {
    try {
        const response = await fetch(`/api/rooms/find`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ playerID: playerID})
        });
        var result = await response.json();
        return { success: response.status == 200, result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}