var express = require('express');
var router = express.Router();
var rModel = require("../models/roomsModel");
var auth = require("../models/authentication");

router.get('/', async function (req, res, next) {
    let result = await rModel.getAllRooms();
    res.status(result.status).send(result.result);
});

// router.get('/:id', async function(req, res, next) {
//     let id = req.params.id;
//     console.log("Get room with id "+id)
//     let result = await rModel.getRoomById(id);
//     res.status(result.status).send(result.result);
//   });

router.get('/:roomid', async function (req, res, next) {
    let roomid = req.params.roomid;
    let result = await rModel.getRoomTurn(roomid);
    res.status(result.status).send(result.result);
});

router.get('/opponent/:room/:id', async function (req, res, next) {
    let room = req.params.room;
    let id = req.params.id;
    let result = await rModel.getRoomOpponentId(room, id);
    res.status(result.status).send(result.result);
});

router.get('/:roomid/:turn', async function (req, res, next) {
    let roomid = req.params.roomid;
    let turn = req.params.turn;
    let result = await rModel.getUserTurn(roomid, turn);
    res.status(result.status).send(result.result);
});

router.post('/newturn', auth.checkAuthentication, async function (req, res, next) {
    let turn_number = req.body.turn_number;
    let roomuser_id = req.body.roomuser_id;
    let result = await rModel.newTurn(turn_number, roomuser_id, req.userId);
    res.status(result.status).send(result.result);
})

router.post('/find', auth.checkAuthentication, async function (req, res, next) {
    let result = await rModel.findRoom(req.userId);
    res.status(result.status).send(result.result);
})

module.exports = router;