const req = require('express/lib/request');
const res = require('express/lib/response');
var pool = require('./connection.js')
var roomsM = require("../models/roomsModel.js")

module.exports.getBoard = async function () {
  try {
    let sql = "Select * from boardtype";
    let result = await pool.query(sql);
    let board = result.rows;
    if (board.length > 0) {
      let boardrows = board[0].boardtype_row;
      sql = "Select boardtype_row from boardtype where boardtype_id = 1"
      result = await pool.query(sql);
      //
      let boardcols = board[0].boardtype_collum;
      sql = "Select boardtype_collum from boardtype where boardtype_id = 1"
      result = await pool.query(sql);
      return { status: 200, result: { board_row: boardrows, board_collum: boardcols } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getOilRigs = async function (roomId) {
  try {
    let sql = "Select roomuser_user_id, count(object_id) as oil_rigs from roomuser inner join object_ on object_roomuser_id = roomuser_id where object_type_id = 1 and roomuser_room_id = $1 group by roomuser_user_id";
    let result = await pool.query(sql, [roomId]);
    result = result.rows;
    return { status: 200, result: result };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.checkSetup = async function (roomId, userId) {
  try {
    let result = await module.exports.getOilRigs(roomId);
    result = result.result
    if (result[0].oil_rigs >= 3 && result[1].oil_rigs >= 3) {
      let turn_number = await roomsM.getRoomTurn(roomId);
      turn_number = turn_number.result.turn_n
      turn_number++
      let roomuser_opponent_id = await roomsM.getRoomOpponentId(roomId, userId)
      roomuser_opponent_id = roomuser_opponent_id.result.roomuser_id

      await roomsM.newTurn(turn_number, roomuser_opponent_id);
      return { status: 200, result: result };

    } else {
      return { status: 200, result: result };

    }

  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.checkHealth = async function (roomId, userId) {
  try {
    let sql = "Select roomuser_user_id, count(objecttile_object_current_health) as player_health from roomuser inner join object_ on object_roomuser_id = roomuser_id inner join objecttile on objecttile_object_id = object_id where object_type_id = 1 and roomuser_room_id = $1 and objecttile_object_current_health = false group by roomuser_user_id";
    let result = await pool.query(sql, [roomId]);
    // console.log(roomId, userId, result)
    result = result.rows
    console.log(result)

    if (result[0].player_health >= 9) {
      if (result[0].roomuser_user_id == userId) {
        return { status: 200, result: true };

      } else {
        return { status: 200, result: false };
      }

    } else if (result[1].player_health >= 9) {
      if (result[1].roomuser_user_id == userId) {
        return { status: 200, result: true };

      } else {
        return { status: 200, result: false };
      }
    } else {
      return { status: 200, result: '' };
    }

  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getResourcesLeft = async function (roomId) {
  try {
    let sql = "SELECT turn_tokens_left, turn_double_left FROM turn INNER JOIN roomuser ON turn_roomuser_id = roomuser_id INNER JOIN room ON roomuser_room_id = room_id WHERE turn_id = (Select max (turn_id) from turn INNER JOIN roomuser on roomuser_id = turn_roomuser_id WHERE roomuser_room_id = $1)";
    let result = await pool.query(sql, [roomId]);
    let resources = result.rows[0];
    return { status: 200, result: resources };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getGameBits = async function (roomId, id) {
  try {
    let sql = "SELECT ($2 = roomuser_user_id) as is_player, objecttile_tile_i, objecttile_tile_j, objecttype_name, objecttile_object_current_health FROM objecttile INNER JOIN object_ ON objecttile_object_id = object_id INNER JOIN objecttype ON objecttype_id = object_type_id INNER JOIN roomuser ON roomuser_id = object_roomuser_id WHERE roomuser_room_id = $1";
    let result = await pool.query(sql, [roomId, id]);
    let gamebits = result.rows;
    return { status: 200, result: { gamebits } };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getGameBitsByTile = async function (tile_i, tile_j, roomId) {
  try {
    let sql = "SELECT objecttile_object_id, objecttype_name, objecttile_object_current_health FROM objecttile INNER JOIN object_ ON objecttile_object_id = object_id INNER JOIN roomuser ON roomuser_id = object_roomuser_id INNER JOIN objecttype ON objecttype_id = object_type_id WHERE objecttile_tile_i = $1 AND objecttile_tile_j = $2 AND roomuser_room_id = $3";
    let result = await pool.query(sql, [tile_i, tile_j, roomId]);
    let gamebit_info = result.rows[0];
    return { status: 200, result: gamebit_info };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getGameBitOwner = async function (tile_i, tile_j, roomId) {
  try {
    let sql = "SELECT roomuser_user_id FROM roomuser INNER JOIN object_ ON object_roomuser_id = roomuser_id WHERE object_id = (SELECT object_id FROM object_ INNER JOIN objecttile ON objecttile_object_id = object_id INNER JOIN roomuser ON roomuser_id = object_roomuser_id WHERE objecttile_tile_i = $1 AND objecttile_tile_j = $2 AND roomuser_room_id = $3)";
    let result = await pool.query(sql, [tile_i, tile_j, roomId]);
    result = result.rows[0];
    return { status: 200, result: result };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.moveBoatsById = async function (gamebit_id, tile_i, tile_j, userid, roomId) {
  try {
    let result = await module.exports.getResourcesLeft(roomId);
    resources_left = result.result.turn_tokens_left;
    result = await module.exports.checkIsPlayerTurn(userid, roomId);

    if (result.result && resources_left > 0) {
      let sql = "SELECT roomuser_user_id FROM object_ INNER JOIN roomuser ON roomuser_id = object_roomuser_id WHERE object_id = $1 AND roomuser_room_id = $2";
      result = await pool.query(sql, [gamebit_id, roomId]);

      if (result.rows[0].roomuser_user_id == userid) {

        let resources_left = await module.exports.getResourcesLeft(roomId);
        resources_left = resources_left.result
        console.log(resources_left)

        let sql4 = "UPDATE turn SET turn_tokens_left = $1 WHERE turn_id = (SELECT turn_id FROM turn INNER JOIN roomuser ON roomuser_id = turn_roomuser_id WHERE roomuser_room_id = $2 AND turn_n = (SELECT MAX (turn_n) FROM turn INNER JOIN roomuser ON roomuser_id = turn_roomuser_id WHERE roomuser_room_id = $2))";
        result = await pool.query(sql4, [(resources_left.turn_tokens_left - 1), roomId]);

        let sql1 = "UPDATE objecttile SET objecttile_tile_i = $1, objecttile_tile_j = $2 WHERE objecttile_object_id = $3";
        result = await pool.query(sql1, [tile_i, tile_j, gamebit_id]);

        return { status: 200, result: result };

      } else {
        console.log("not players object")
        return { status: 200, result: result };
      }
    } else { return { status: 200, result: result }; }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

// module.exports.moveBoatsById = async function (gamebit_id, tile_i, tile_j, userid) {
//   try {
//     let result = await module.exports.checkIsPlayerTurn(userid);
//     if (result.result) {
//       // result = await module.exports.getGameBitOwner(tile_i, tile_j);
//       // result = result.result.roomuser_user_id;
//       // if (result == userid) {
//         let sql1 = "UPDATE objecttile SET objecttile_tile_i = $1, objecttile_tile_j = $2 WHERE objecttile_object_id = $3";
//         result = await pool.query(sql1, [tile_i, tile_j, gamebit_id]);
//         return { status: 200, result: result };
//       // } else {
//       //   console.log("not players object")
//       // }
//     } else { return { status: 200, result: result }; }
//   } catch (err) {
//     console.log(err);
//     return { status: 500, result: err };
//   }
// }

module.exports.damageObject = async function (object_id, damage_object_tile_i, damage_object_tile_j, userid, roomId) {
  try {
    let result = await module.exports.checkIsPlayerTurn(userid, roomId);
    if (result.result) {
      let sql = "UPDATE objecttile SET objecttile_object_current_health = false WHERE objecttile_tile_i = $1 AND objecttile_tile_j = $2 AND objecttile_object_id = $3";
      result = await pool.query(sql, [damage_object_tile_i, damage_object_tile_j, object_id]);
      return { status: 200, result: result };
    } else {
      return { status: 200, result: result };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.createGamebits = async function (objecttype_id, object_i, object_j, user_id, roomId) {
  try {
    let result = await module.exports.checkIsPlayerTurn(user_id, roomId);
    console.log(result.result + user_id + roomId)

    let sql = "SELECT MAX (turn_n) AS turn_n FROM turn INNER JOIN roomuser ON roomuser_id = turn_roomuser_id WHERE roomuser_room_id = $1";
    let turn_n = await pool.query(sql, [roomId]);

    if (result.result || turn_n.rows[0].turn_n == 0) {
      let resources_left = await module.exports.getResourcesLeft(roomId);
      resources_left = resources_left.result
      if ((objecttype_id == 1 && turn_n.rows[0].turn_n == 0) || (objecttype_id == 2 && resources_left.turn_tokens_left >= 2) || (objecttype_id == 3 && (resources_left.turn_tokens_left >= 5 || resources_left.turn_double_left == true))) {
        let player_board_side = await module.exports.checkBoardSide(user_id, roomId, object_i);
        // player_board_side = player_board_side.result;
        console.log(player_board_side)

        if (player_board_side) {
          let sql1 = "INSERT INTO object_ (object_type_id, object_roomuser_id) VALUES ($1, (SELECT roomuser_id FROM roomuser WHERE roomuser_user_id = $2 AND roomuser_room_id = $3))";
          let result = await pool.query(sql1, [objecttype_id, user_id, roomId]);
          let sql2 = "SELECT MAX (object_id) AS object_id FROM object_ INNER JOIN roomuser ON object_roomuser_id = roomuser_id WHERE roomuser_room_id = $1";
          result = await pool.query(sql2, [roomId]);
          let new_object_id = result.rows[0].object_id

          if (objecttype_id == 1) {
            let sql3 = "INSERT INTO objecttile (objecttile_object_id, objecttile_tile_i, objecttile_tile_j, objecttile_object_current_health) VALUES ($1, $2, $3, default), ($1, $2, ($3 + 1), default), ($1, $2, ($3 + 2), default)";
            result = await pool.query(sql3, [new_object_id, object_i, object_j]);

          } else if (objecttype_id == 2) {
            let sql4 = "UPDATE turn SET turn_tokens_left = $1 WHERE turn_id = (SELECT turn_id FROM turn INNER JOIN roomuser ON roomuser_id = turn_roomuser_id WHERE roomuser_room_id = $2 AND turn_n = (SELECT MAX (turn_n) FROM turn INNER JOIN roomuser ON roomuser_id = turn_roomuser_id WHERE roomuser_room_id = $2))";
            result = await pool.query(sql4, [(resources_left.turn_tokens_left - 2), roomId]);
            let sql5 = "INSERT INTO objecttile (objecttile_object_id, objecttile_tile_i, objecttile_tile_j, objecttile_object_current_health) VALUES ($1, $2, $3, default)";
            result = await pool.query(sql5, [new_object_id, object_i, object_j]);

          } else if (objecttype_id == 3) {
            let sql6 = "UPDATE turn SET turn_tokens_left = $1 WHERE turn_id = (SELECT turn_id FROM turn INNER JOIN roomuser ON roomuser_id = turn_roomuser_id WHERE roomuser_room_id = $2 AND turn_n = (SELECT MAX (turn_n) FROM turn INNER JOIN roomuser ON roomuser_id = turn_roomuser_id WHERE roomuser_room_id = $2))";
            result = await pool.query(sql6, [(resources_left.turn_tokens_left - 5), roomId]);
            let sql7 = "INSERT INTO objecttile (objecttile_object_id, objecttile_tile_i, objecttile_tile_j, objecttile_object_current_health) VALUES ($1, $2, $3, default)";
            result = await pool.query(sql7, [new_object_id, object_i, object_j]);
          }
        } else if (player_board_side == false) {
          return { status: 200, result: "Not player board" };
        }
      }
      return { status: 200, result: result };
    } else {
      return { status: 200, result: result };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.deleteBoat = async function (gamebit_id, gamebit_tile_i, gamebit_tile_j, userid, roomId) {
  try {
    let result = await module.exports.checkIsPlayerTurn(userid, roomId);

    if (result.result) {
      let sql = "DELETE FROM objecttile WHERE objecttile_tile_i = $1 AND objecttile_tile_j = $2 AND objecttile_object_id = $3";
      let result = await pool.query(sql, [gamebit_tile_i, gamebit_tile_j, gamebit_id]);

      let sql1 = "DELETE FROM object_ WHERE object_id = $1";
      result = await pool.query(sql1, [gamebit_id]);

      return { status: 200, result: result };

    } else {
      return { status: 200, result: result };

    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };

  }
}

module.exports.checkIsPlayerTurn = async function (user, roomId) {
  try {
    let sql = "select (turn_roomuser_id = (Select roomuser_id from roomuser WHERE roomuser_user_id = $1 AND roomuser_room_id = $2)) as user_turn from roomuser INNER JOIN turn ON turn_roomuser_id = roomuser_id Where turn_id = (Select max (turn_id) from turn INNER JOIN roomuser on roomuser_id = turn_roomuser_id WHERE roomuser_room_id = $2)";
    let result = await pool.query(sql, [user, roomId]);
    result = result.rows[0]
    return { status: 200, result: result.user_turn };

  } catch (err) {
    console.log(err);
    return { status: 500, result: err };

  }
}

module.exports.getPlayerBoardSide = async function (roomId) {
  try {
    let sql = "SELECT roomuser_user_id, user_name FROM roomuser INNER JOIN user_ ON roomuser_user_id = user_id WHERE roomuser_room_id = $1 ORDER BY roomuser_user_id ASC";
    let result = await pool.query(sql, [roomId]);
    result = result.rows
    return { status: 200, result: result };

  } catch (err) {
    console.log(err);
    return { status: 500, result: err };

  }
}

module.exports.checkBoardSide = async function (user, roomId, object_pos) {
  try {
    let result = await module.exports.getPlayerBoardSide(roomId);
    result = result.result;

    let left_board_side = result[0];
    let right_board_side = result[1];

    if (user == left_board_side.roomuser_user_id) {
      let board_collum = await module.exports.getBoard();
      board_collum = board_collum.result.board_collum

      if (object_pos >= 0 && object_pos < (board_collum / 2)) {
        return { status: 200, result: true };

      } else {
        return { status: 200, result: false };

      }

    } else if (user == right_board_side.roomuser_user_id) {
      let board_collum = await module.exports.getBoard();
      board_collum = board_collum.result.board_collum

      if (object_pos >= (board_collum / 2) && object_pos < board_collum) {
        return { status: 200, result: true };

      } else {
        return { status: 200, result: false };

      }
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}