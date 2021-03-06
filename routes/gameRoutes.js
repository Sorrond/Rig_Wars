var express = require('express');
var router = express.Router();
var rModel = require("../models/boardModel");
var auth = require("../models/authentication")

router.get('/', async function (req, res, next) {
    let result = await rModel.getBoard();
    res.status(result.status).send(result.result);
}); 

router.get('/:roomId/check/:user/turn', async function (req, res, next) {
    let roomId = req.params.roomId;
    let user = req.params.user
    let result = await rModel.checkIsPlayerTurn(user, roomId);
    res.status(result.status).send(result.result);
});

router.get('/gamebits/:roomId', auth.checkAuthentication, async function (req, res, next) {
    let roomId = req.params.roomId;
    let result = await rModel.getGameBits(roomId, req.userId);
    res.status(result.status).send(result.result);
});

router.get('/:roomId/gamebits/id/:tile_i/:tile_j', async function (req, res, next) {
    let roomId = req.params.roomId;
    let tile_i = req.params.tile_i;
    let tile_j = req.params.tile_j;
    let result = await rModel.getGameBitsByTile(tile_i, tile_j, roomId);
    res.status(result.status).send(result.result);
});

router.get('/:roomId/gamebit/owner/:tile_i/:tile_j', async function (req, res, next) {
    let roomId = req.params.roomId;
    let tile_i = req.params.tile_i;
    let tile_j = req.params.tile_j;
    let result = await rModel.getGameBitOwner(tile_i, tile_j, roomId);
    res.status(result.status).send(result.result);
});

router.get('/:roomId/user/side', async function (req, res, next) {
    let roomId = req.params.roomId;
    let result = await rModel.getPlayerBoardSide(roomId);
    res.status(result.status).send(result.result);
});

router.get('/:roomId/check/side', auth.checkAuthentication, async function (req, res, next) {
    let roomId = req.params.roomId;
    let result = await rModel.checkBoardSide(req.userId, roomId);
    res.status(result.status).send(result.result);
});

router.post('/:roomId/gamebits/create', auth.checkAuthentication, async function (req, res, next) {
    let roomId = req.params.roomId;
    let objecttype_id = req.body.objecttype_id;
    let object_i = req.body.object_i;
    let object_j = req.body.object_j
    let result = await rModel.createGamebits(objecttype_id, object_i, object_j, req.userId, roomId);
    res.status(result.status).send(result.result);
});

router.post('/:roomId/gamebits/id/move', auth.checkAuthentication, async function (req, res, next) {
    let roomId = req.params.roomId;
    let tile_i = req.body.tile_i;
    let tile_j = req.body.tile_j;
    let gamebit_id = req.body.gamebit_id;
    let result = await rModel.moveBoatsById(gamebit_id, tile_i, tile_j, req.userId, roomId);
    res.status(result.status).send(result.result);
});

router.post('/:roomId/gamebits/id/damage', auth.checkAuthentication, async function (req, res, next) {
    let roomId = req.params.roomId;
    let object_id = req.body.object_id;
    let damage_object_tile_i = req.body.damage_object_tile_i;
    let damage_object_tile_j = req.body.damage_object_tile_j;
    let result = await rModel.damageObject(object_id, damage_object_tile_i, damage_object_tile_j, req.userId, roomId);
    res.status(result.status).send(result.result);
});

router.post('/:roomId/gamebits/id/delete', auth.checkAuthentication, async function (req, res, next) {
    let roomId = req.params.roomId;
    let gamebit_id = req.body.gamebit_id;
    let gamebit_tile_i = req.body.gamebit_tile_i;
    let gamebit_tile_j = req.body.gamebit_tile_j;
    let result = await rModel.deleteBoat(gamebit_id, gamebit_tile_i, gamebit_tile_j, req.userId, roomId);
    res.status(result.status).send(result.result);
});

router.get('/:roomId/resources/left', async function (req, res, next) {
    let roomId = req.params.roomId;
    let result = await rModel.getResourcesLeft(roomId);
    res.status(result.status).send(result.result);
});

router.get('/:roomId/gamebits/oilrigs', async function (req, res, next) {
    let roomId = req.params.roomId;
    let result = await rModel.getOilRigs(roomId);
    res.status(result.status).send(result.result);
});

router.get('/:roomId/check/setup', auth.checkAuthentication, async function (req, res, next) {
    let roomId = req.params.roomId;
    let result = await rModel.checkSetup(roomId, req.userId);
    res.status(result.status).send(result.result);
});

router.get('/:roomId/check/health', auth.checkAuthentication, async function (req, res, next) {
    let roomId = req.params.roomId;
    let result = await rModel.checkHealth(roomId, req.userId);
    res.status(result.status).send(result.result);
});

module.exports = router;