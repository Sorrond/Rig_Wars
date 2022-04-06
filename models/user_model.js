var pool = require('./connection.js')

module.exports.loginCheck = async function (name,password) {
    try {
      let sql = `Select user_id from user_ where user_name = $1 and user_password = $2`;
      let result = await pool.query(sql,[name,password]);
      if (result.rows.length == 0) {
          return { status: 401, result: {msg: "Wrong password or username."}}
      }
      let ply_id = result.rows[0].ply_id;
      return { status: 200, result: {msg: "Login correct", userId : ply_id} };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
}

module.exports.getLoggedUserInfo = async function (playerId) {
    try {
        let sql = `Select * from user_ where user_id = $1`;
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