var express = require('express');
var router = express.Router();
var rModel = require("../models/boardModel");

router.get('/', async function(req, res, next) {
    let result = await rModel.getBoard();
    res.status(result.status).send(result.result);
});

module.exports = router;