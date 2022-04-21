var pool = require('./connection.js')

module.exports.getBoard = async function() {
    try {
      let sql = "Select * from board";
      let result = await pool.query(sql);
      let board = result.rows;
      if(board.length > 0){
        let boardrows = board[0].board_row;
        sql = "Select board_row from board where board_id = 1"
        result = await pool.query(sql);
        //
        let boardcols = board[0].board_collum;
        sql = "Select board_collum from board where board_id = 1"
        result = await pool.query(sql);
        return { status: 200, result: { board_row: boardrows,  board_collum: boardcols}};

        // let roomid = rooms[0].room_id;
        // sql = "INSERT INTO roomuser (roomuser_room_id, roomuser_user_id) values($1, $2)"
        // result = await pool.query(sql, [roomid, playID]);
      }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err};
    }
  }