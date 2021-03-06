var express = require('express');
var router = express.Router();
var umodel = require("../models/user_model");
var auth = require("../models/authentication")
            
router.post('/login', async function(req, res, next) {
    console.log("Login")
    let name = req.body.name;
    let password = req.body.password;
    let result = await umodel.loginCheck(name,password);
    if (result.status == 200) {
        auth.saveUserId(res,result.result.userId);
        res.status(result.status).send({msg:"User logged in"});
    } else  res.status(result.status).send(result.result);
});

router.post('/logout', auth.checkAuthentication, async function(req, res, next) {
    console.log("Logout")
    auth.logout(res);    
    res.status(200).send({msg:"User logged out"});
});

router.get('/profile', auth.checkAuthentication, async function(req, res, next) {
    console.log("Get profile of logged user ");
    let result = await umodel.getLoggedUserInfo(req.userId);
    res.status(result.status).send(result.result);
});

router.post('/register', async function(req,res,next) {
    let player = req.body;
    console.log("Register user with info: ");
    console.log(player);
    let result = await umodel.registerPlayer(player);
    res.status(result.status).send(result.result);
}) 


module.exports = router;