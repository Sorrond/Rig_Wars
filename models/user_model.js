var pool = require('./connection.js')

module.exports.getLoggedUserInfo = async function (playerId) {
    try {
        let sql = `Select * from user_ where user_id = $`;
        let result = await pool.query(sql, [playerId]);
        if (result.rows.length > 0) {
            let player = result.rows[0];
            return { status: 200, result: player };
        } else {
            return { status: 404, result: { msg: "No user with that id" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }