async function getBoard() {
    try {
        const response = await fetch(`/api/board`);
        if (response.status == 200) {
            var board = await response.json();
            return board;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function checkIsPlayerTurn(user) {
    try {
        const response = await fetch(`/api/board/${getCookie("roomId")}/check/${user}/turn`);
        if (response.status == 200) {
            var roomuser_user_id = await response.json();
            return roomuser_user_id;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function getOilRigs() {
    try {
        const response = await fetch(`/api/board/${getCookie("roomId")}/gamebits/oilrigs`);
        if (response.status == 200) {
            var result = await response.json();
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

async function checkHealth() {
    try {
        const response = await fetch(`/api/board/${getCookie("roomId")}/check/health`);
        if (response.status == 200) {
            var result = await response.json();
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

async function checkSetup() {
    try {
        const response = await fetch(`/api/board/${getCookie("roomId")}/check/setup`);
        if (response.status == 200) {
            var result = await response.json();
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

async function getResourcesLeft() {
    try {
        const response = await fetch(`/api/board/${getCookie("roomId")}/resources/left`);
        if (response.status == 200) {
            var resources = await response.json();
            return resources;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function getGameBits() {
    try {
        const response = await fetch(`/api/board/gamebits/${getCookie("roomId")}`);
        if (response.status == 200) {
            var gamebits = await response.json();
            return gamebits;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function getGameBitsByTile(tile_i, tile_j) {
    try {
        const response = await fetch(`/api/board/${getCookie("roomId")}/gamebits/id/${tile_i}/${tile_j}`);
        if (response.status == 200) {
            var gamebit_info = await response.json();
            return gamebit_info;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
};

async function getGameBitOwner(tile_i, tile_j) {
    try {
        const response = await fetch(`/api/board/${getCookie("roomId")}/gamebit/owner/${tile_i}/${tile_j}`);
        if (response.status == 200) {
            var roomuser_user_id = await response.json();
            return roomuser_user_id;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
};

async function getPlayerBoardSide() {
    try {
        const response = await fetch(`/api/board/${getCookie("roomId")}/user/side`);
        if (response.status == 200) {
            var user_board_info = await response.json();
            //user_board_info = user_board_info.result.rows[0];
            return user_board_info;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
};

async function checkBoardSide() {
    try {
        const response = await fetch(`/api/board/${getCookie("roomId")}/check/side`);
        if (response.status == 200) {
            var user_board_side = await response.json();
            return user_board_side;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
};

async function createGamebits(objecttype_id, object_i, object_j) {
    try {
        const response = await fetch(`/api/board/${getCookie("roomId")}/gamebits/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ objecttype_id: objecttype_id, object_i: object_i, object_j: object_j })
        });
        var result = await response.json();
        return { success: response.status == 200, result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function moveBoatsById(tile_i, tile_j, gamebit_id) {
    try {
        //console.log(tile_i, tile_j, gamebit_id)
        const response = await fetch(`/api/board/${getCookie("roomId")}/gamebits/id/move`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tile_i: tile_i, tile_j: tile_j, gamebit_id: gamebit_id })
        });
        var result = await response.json();
        return { success: response.status == 200, result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function damageObject(object_id, damage_object_tile_i, damage_object_tile_j) {
    try {
        //console.log(tile_i, tile_j, gamebit_id)
        const response = await fetch(`/api/board/${getCookie("roomId")}/gamebits/id/damage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ object_id: object_id, damage_object_tile_i: damage_object_tile_i, damage_object_tile_j: damage_object_tile_j })
        });
        var result = await response.json();
        return { success: response.status == 200, result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function deleteBoat(gamebit_id, gamebit_tile_i, gamebit_tile_j) {
    try {
        //console.log(tile_i, tile_j, gamebit_id)
        const response = await fetch(`/api/board/${getCookie("roomId")}/gamebits/id/delete`, {
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