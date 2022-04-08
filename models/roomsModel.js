var pool = require('./connection.js')

module.exports.getAllRooms = async function() {
  try {
    let sql = "Select * from room";
    let result = await pool.query(sql);
    let rooms = result.rows;
    return { status: 200, result: rooms};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err};
  }
}  

module.exports.findRoom = async function(playID) {
  try {
    let sql = "select room_id from room where room_isfull = false and room_id not in (select roomuser_room_id from roomuser where roomuser_user_id = $1)";
    let result = await pool.query(sql, [playID]);
    let rooms = result.rows;
    if(rooms.length > 0){
      let roomid = rooms[0].room_id;
      sql = "INSERT INTO roomuser (roomuser_room_id, roomuser_user_id) values($1, $2)"
      result = await pool.query(sql, [roomid, playID]);
      //
      sql = "select count(*) as number_players from roomuser where roomuser_room_id = $1"
      result = await pool.query(sql, [roomid]);
      if(result.rows[0].number_players == 2){
        sql = "update room set room_isfull = true where room_id = $1"
        result = await pool.query(sql, [roomid]);
      }
      return { status: 200, result: {room_id: roomid}};
    } else { 
      return { status: 404, result: {room_id: -1}};
    }
   
  } catch (err) {
    console.log(err);
    return { status: 500, result: err};
  }
}
