var pool = require('./connection.js')

module.exports.getBoard = async function() {
    try {
      let sql = "Select * from board";
      let result = await pool.query(sql);
      let board = result.rows;
      return { status: 200, result: board};
    } catch (err) {
      console.log(err);
      return { status: 500, result: err};
    }
  }