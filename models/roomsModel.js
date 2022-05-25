var pool = require('./connection.js')
var board = require("../models/boardModel.js")

module.exports.getAllRooms = async function () {
  try {
    let sql = "Select * from room";
    let result = await pool.query(sql);
    let rooms = result.rows;
    return { status: 200, result: rooms };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getRoomTurn = async function (roomid) {
  try {
    let sql = "SELECT turn_n from turn INNER JOIN roomuser ON roomuser_id = turn_roomuser_id where roomuser_room_id = $1 ORDER BY turn_n DESC LIMIT 1;";
    let result = await pool.query(sql, [roomid]);
    return { status: 200, result: result };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getUserTurn = async function (roomid, turn) {
  try {
    let sql = "SELECT roomuser_user_id from turn INNER JOIN roomuser ON roomuser_id = turn_roomuser_id where roomuser_room_id = $1 and turn_n = $2";
    let result = await pool.query(sql, [roomid, turn]);
    return { status: 200, result: result };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getRoomOpponentId = async function (room, id) {
  try {
    let sql = "SELECT roomuser_id from roomuser where roomuser_room_id = $1 and roomuser_user_id != $2";
    let result = await pool.query(sql, [room, id]);
    return { status: 200, result: result };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

// module.exports.newTurn = async function (turn_number, roomuser_id, id) {
//   try {
//     let sql = "UPDATE turn SET turn_n = $1 and turn_roomuser_id WHERE turn_roomuser_id = $2";
//     let result = await pool.query(sql, [turn_number, roomuser_id, id]);
//     return { status: 200, result: result };
//   } catch (err) {
//     console.log(err);
//     return { status: 500, result: err };
//   }
// }

module.exports.newTurn = async function (turn_number, roomuser_id, tokens, double, user) {
  try {
    let result = await board.checkIsPlayerTurn(user);
    let sql = "INSERT INTO turn (turn_n, turn_roomuser_id, turn_tokens, turn_tokens_left, turn_double, turn_double_left) VALUES ($1, $2, $3, $3, $4, $4)";
    result = await pool.query(sql, [turn_number, roomuser_id, tokens, double]);
    return { status: 200, result: result };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.findRoom = async function (playID) {
  try {
    let sql = "select room_id from room where room_isfull = false and room_id not in (select roomuser_room_id from roomuser where roomuser_user_id = $1)";
    let result = await pool.query(sql, [playID]);
    let rooms = result.rows;
    if (rooms.length > 0) {
      let roomid = rooms[0].room_id;
      sql = "INSERT INTO roomuser (roomuser_room_id, roomuser_user_id) values($1, $2)"
      result = await pool.query(sql, [roomid, playID]);
      //
      sql = "select count(*) as number_players from roomuser where roomuser_room_id = $1"
      result = await pool.query(sql, [roomid]);
      if (result.rows[0].number_players == 2) {
        sql = "update room set room_isfull = true where room_id = $1"
        result = await pool.query(sql, [roomid]);
      }
      return { status: 200, result: { room_id: roomid } };
    } else {
      return { status: 404, result: { room_id: -1 } };
    }

  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}
