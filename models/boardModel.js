var pool = require('./connection.js')

module.exports.getBoard = async function () {
  try {
    let sql = "Select * from board";
    let result = await pool.query(sql);
    let board = result.rows;
    if (board.length > 0) {
      let boardrows = board[0].board_row;
      sql = "Select board_row from board where board_id = 1"
      result = await pool.query(sql);
      //
      let boardcols = board[0].board_collum;
      sql = "Select board_collum from board where board_id = 1"
      result = await pool.query(sql);
      return { status: 200, result: { board_row: boardrows, board_collum: boardcols } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getGameBits = async function (id) {
  try {
    let sql = "SELECT ($2 = roomuser_user_id) as is_player, objecttile_tile_i, objecttile_tile_j, objecttype_name, objecttile_object_current_health FROM objecttile INNER JOIN object_ ON objecttile_object_id = object_id INNER JOIN objecttype ON objecttype_id = object_type_id INNER JOIN roomuser ON roomuser_id = object_roomuser_id WHERE roomuser_room_id = $1";
    let result = await pool.query(sql,[1,id]);
    let gamebits = result.rows;
    return { status: 200, result: { gamebits } };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getGameBitsByTile = async function (tile_i, tile_j) {
  try {
    let sql = "SELECT objecttile_object_id, objecttype_name, objecttile_object_current_health FROM objecttile INNER JOIN object_ ON objecttile_object_id = object_id INNER JOIN objecttype ON objecttype_id = object_type_id WHERE objecttile_tile_i = $1 AND objecttile_tile_j = $2";
    let result = await pool.query(sql, [tile_i, tile_j]);
    let gamebit_info = result.rows[0];
    return { status: 200, result: gamebit_info };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.moveBoatsById = async function (gamebit_id, tile_i, tile_j) {
  try {
    let sql1 = "UPDATE objecttile SET objecttile_tile_i = $1, objecttile_tile_j = $2 WHERE objecttile_object_id = $3";
    let result = await pool.query(sql1, [tile_i, tile_j, gamebit_id]);
    return { status: 200, result: result };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.damageObject = async function (object_id, damage_object_tile_i, damage_object_tile_j) {
  try {
    let sql = "UPDATE objecttile SET objecttile_object_current_health = false WHERE objecttile_tile_i = $1 AND objecttile_tile_j = $2 AND objecttile_object_id = $3";
    let result = await pool.query(sql, [damage_object_tile_i, damage_object_tile_j, object_id]);
    return { status: 200, result: result};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.createGamebits = async function (turn_number, roomuser_id, id) {
  try {
    let sql = "";
    let result = await pool.query(sql, [turn_number, roomuser_id, id]);
    return { status: 200, result: result };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.deleteBoat = async function (gamebit_id, gamebit_tile_i, gamebit_tile_j) {
  try {
    let sql = "DELETE FROM objecttile WHERE objecttile_tile_i = $1 AND objecttile_tile_j = $2 AND objecttile_object_id = $3";
    let result = await pool.query(sql, [gamebit_tile_i, gamebit_tile_j, gamebit_id]);
    let sql1 = "DELETE FROM object_ WHERE object_id = $1";
    result = await pool.query(sql1, [gamebit_id]);
    return { status: 200, result: result};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}