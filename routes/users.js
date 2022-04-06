var express = require('express');
var umodel = require('../models/user_model')
var auth = require('../models/authentication')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users=[{name:"John Doe", birthDate:"19/02/1999"}];
  res.send(users);
});

router.get('/profile', auth.checkAuthentication, async function(req, res, next) {
  console.log("Get profile of logged user ");
  let result = await uModel.getLoggedUserInfo(req.userId);
  res.status(result.status).send(result.result);
});


module.exports = router;
