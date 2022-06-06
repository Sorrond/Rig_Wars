var pool = require('./connection.js')
var boardM = require("../models/boardModel.js")

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

module.exports.getRoomTurn = async function (roomId) {
  try {
    let sql = "SELECT MAX (turn_n) as turn_n from turn INNER JOIN roomuser ON roomuser_id = turn_roomuser_id where roomuser_room_id = $1";
    let result = await pool.query(sql, [roomId]);
    return { status: 200, result: result };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getUserTurn = async function (roomId, turn) {
  try {
    let sql = "SELECT roomuser_user_id from turn INNER JOIN roomuser ON roomuser_id = turn_roomuser_id where roomuser_room_id = $1 and turn_n = $2";
    let result = await pool.query(sql, [roomId, turn]);
    return { status: 200, result: result };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getRoomOpponentId = async function (roomId, id) {
  try {
    let sql = "SELECT roomuser_id from roomuser where roomuser_room_id = $1 and roomuser_user_id != $2";
    let result = await pool.query(sql, [roomId, id]);
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

module.exports.newTurn = async function (turn_number, roomuser_id, user, roomId) {
  try {
    let result = await boardM.checkIsPlayerTurn(user, roomId);
    console.log(turn_number)
    if (result.result) {
      result = await RollDice();
      let sql = "INSERT INTO turn (turn_n, turn_roomuser_id, turn_tokens, turn_tokens_left, turn_double, turn_double_left) VALUES ($1, $2, $3, $3, $4, $4)";
      result = await pool.query(sql, [turn_number, roomuser_id, result[0], result[1]]);
      return { status: 200, result: result };
    } else {
      return { status: 200, result: result.result };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

async function RollDice() {
  //implement in a way that every turn pass, it rolls by itself and saves automaticaly inside DB so no exploits can happen
  let roll1;
  let roll2;
  let result = [];

  //Dice 
  roll1 = await getRandomIntInclusive(1, 6);
  roll2 = await getRandomIntInclusive(1, 6);
  if (roll1 == roll2) {
    result[1] = true

  } else {
    result[1] = false

  }

  //Result 
  result[0] = roll1 + roll2

  return result;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.findRoom = async function (playID) {
  try {
    let sql = "select room_id from room where room_isfull = false and room_id not in (select roomuser_room_id from roomuser where roomuser_user_id = $1)";
    let result = await pool.query(sql, [playID]);
    let roomssize = result;
    let rooms = result.rows;
    if (rooms.length > 0) {
      let roomid = rooms[0].room_id;
      sql = "INSERT INTO roomuser (roomuser_room_id, roomuser_boardtype_id, roomuser_user_id) values($1, 1, $2)"
      result = await pool.query(sql, [roomid, playID]);
      //
      sql = "select count(*) as number_players from roomuser where roomuser_room_id = $1"
      result = await pool.query(sql, [roomid]);
      if (result.rows[0].number_players == 2) {
        sql = "update room set room_isfull = true where room_id = $1"
        result = await pool.query(sql, [roomid]);
        sql = "INSERT INTO turn (turn_n, turn_roomuser_id, turn_tokens, turn_tokens_left, turn_double, turn_double_left) VALUES (0, (SELECT MIN (roomuser_id) FROM roomuser WHERE roomuser_room_id = $1), 0, 0, false, false);"
        result = await pool.query(sql, [roomid]);
      }
      return { status: 200, result: { room_id: roomid } };
    } else if (roomssize.rowCount == 0) {
      sql = `INSERT INTO room (room_isfull, room_gamestate) values(default, default) returning room_id`
      result = await pool.query(sql);
      roomid = result.rows[0].room_id;
      console.log(result.rows[0].room_id);
      sql =  `INSERT INTO roomuser (roomuser_room_id, roomuser_boardtype_id, roomuser_user_id) values($1 , 1, $2)`
      result = await pool.query(sql, [result.rows[0].room_id, playID]);

      return { status: 200, result: { room_id: roomid } };
    } else {
      return { status: 404, result: { room_id: -1 } };
    }

  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}
