var pool = require('./connection.js')

module.exports.loginCheck = async function (name, password) {
  try {
    let sql = `Select user_id from user_ where user_name = $1 and user_password = $2`;
    let result = await pool.query(sql, [name, password]);
    if (result.rows.length == 0) {
      return { status: 401, result: { msg: "Wrong password or username." } }
    }
    let user_id = result.rows[0].user_id;
    return { status: 200, result: { msg: "Login correct", userId: user_id } };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.getLoggedUserInfo = async function (playerId) {
  try {
    let sql = `Select user_name, user_id from user_ where user_id = $1`;
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

module.exports.registerPlayer = async function (player) {
  try {
    let sql_check = "Select user_name from user_ where user_name = $1";
    let result_check = await pool.query(sql_check, [player.name]);
    if (result_check.rows.length == 0) {
      let sql = "Insert into user_ (user_name, user_password) values ($1,$2)";
      if (player.name != "" || player.password != ""){
        let result = await pool.query(sql, [player.name, player.password]);
      } else {
        console.log("player.name está vazio")
      }
      return { status: 200, result: result };
    } else {
      return { status: 401, result: { msg: 'This username already exits.' } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}