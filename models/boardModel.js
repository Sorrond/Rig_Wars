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

module.exports.getGameBits = async function () {
  try {
    let sql = "SELECT usertile_user_id, usertile_tile_i, usertile_tile_j, object_name, usertile_object_current_health FROM usertile INNER JOIN object_ ON usertile_object_id = object_id";
    let result = await pool.query(sql);
    let gamebits = result.rows;
    return { status: 200, result: { gamebits } };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getGameBitsByTile = async function (tile_i, tile_j) {
  try {
    let sql = "SELECT usertile_object_id, object_name, usertile_object_current_health FROM usertile INNER JOIN object_ ON usertile_object_id = object_id WHERE usertile_tile_i = $1 AND usertile_tile_j = $2";
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
    let sql = "UPDATE usertile SET usertile_tile_i = $1, usertile_tile_j = $2 WHERE usertile_object_id = $3";
    let result = await pool.query(sql, [tile_i, tile_j, gamebit_id]);
    return { status: 200, result: result };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.damageObject = async function (object_id, damage_object_tile_i, damage_object_tile_j) {
  try {
    let sql = "UPDATE usertile SET usertile_object_current_health = false WHERE usertile_tile_i = $1 AND usertile_tile_j = $2 AND usertile_object_id = $3";
    let result = await pool.query(sql, [damage_object_tile_i, damage_object_tile_j, object_id]);
    return { status: 200, result: result};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.deleteBoat = async function (gamebit_id, gamebit_tile_i, gamebit_tile_j) {
  try {
    let sql = "DELETE FROM usertile WHERE usertile_tile_i = $1 AND usertile_tile_j = $2 AND usertile_object_id = $3";
    let result = await pool.query(sql, [gamebit_tile_i, gamebit_tile_j, gamebit_id]);
    return { status: 200, result: result};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}