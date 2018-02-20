var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterTokenStrategy = require('passport-twitter').Strategy;
var configAuth = require('./token');
var moment = require('moment');





var User = require('../models/user');

 router.get('/new-story', function(req,res){
     res.render('new-story');
 });
router.get('/Publish', function(req,res){
     res.render('new-story');
 });

//Google Passport
router.get('/google',
  passport.authenticate('google', { scope: ['profile','email']}));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/', successRedirect: '/blog/overview' }));
        router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
});




//Twitter Passport
router.get('/twitter',
  passport.authenticate('twitter'));
router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/', successRedirect: '/blog/overview' }));
        router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
});

        
     passport.serializeUser(function(user, done) {
  done(null, user);
});


passport.deserializeUser(function(user, done) {
  done(null, user);
});
        
// Google Strategy
passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecert,
    callbackURL: configAuth.googleAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
process.nextTick(function(){
    
    User.findOne({'google.id': profile.id}, function(err, user){
        
        if(err)
            return done(err);
        if(user)
            return done(null, user);
        else{
            var newUser = new User();
            newUser.google.id = profile.id;
            newUser.google.token = accessToken;
            newUser.google.name = profile.displayName;
            newUser.google.email = profile.emails[0].value;
            
            newUser.save(function(err){
                
                if(err)
                    throw err;
                return done(null, newUser);
            });
        }
    });
});
  }
));




// Twitter Strategy


passport.use(new TwitterTokenStrategy({
    consumerKey: 'VNoGlrxyuAnR5zox3rl484OiA',
    consumerSecret: '8Vku4hKsG1t6JFnSHNiQGHzDMQDYY7FUdGPszaXjH0Rhblz2nC',
    callbackURL: 'http://localhost:8080/auth/twitter/callback'
  }, function(token, tokenSecret, profile, done) {
        return done(null,profile);
  }
));




router.post('/Publish',function(req,res){
   
    var blog_title = req.body.blog_title;
    var blog_para = req.body.blog_para;
    var today_date = moment().format("MMMM Do YYYY");
    var user_name = req.body.user_name;
    var today_time = moment().format('LTS');


    
        //Validations
    
    req.checkBody('blog_title', 'blog_title is required').notEmpty();
    req.checkBody('blog_para', 'This Content needs more detail. Add more information to enhance a clear answer, written as a complete sentence.').notEmpty();
    
    var errors = req.validationErrors();
    if(errors)
       {
           res.render('new-story',{
               errors:errors
           });
       
       }
       else{
                 var ContentnewUser = new User({

                        blog_title: blog_title,
                        blog_para:blog_para,             
                        today_date:today_date,
                        user_name:user_name,
                        today_time:today_time
                 });
           
           
           User.createUser(ContentnewUser, function(err,user){
               if(err)throw err;
               console.log(user);  
           });
           
           req.flash('success_msg', 'You are registered and can now login');
           res.redirect('/blog/overview');

       }
});



module.exports = router;