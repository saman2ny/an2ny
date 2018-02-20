var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Blog
router.get('/overview',function(req,res){
   res.render('overview'); 
});

//Seperate-content
router.get('/seperate-content',function(req,res){
   res.render('seperate-content'); 
});


module.exports = router;