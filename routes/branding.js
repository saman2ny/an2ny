var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Logo-Design
router.get('/logoDesign',function(req,res){
   res.render('logoDesign'); 
});

//Logo-Design
router.get('/stationeryDesign',function(req,res){
   res.render('stationeryDesign'); 
});

//Brochure-Design
router.get('/brochureDesign',function(req,res){
   res.render('brochureDesign'); 
});

//Menu-Design
router.get('/menuCardDesign',function(req,res){
   res.render('menuCardDesign'); 
});

//Landing-Design
router.get('/landingPageDesign',function(req,res){
   res.render('landingPageDesign'); 
});

//Pacakage-Design
router.get('/packageDesign',function(req,res){
   res.render('packageDesign'); 
});

//Magazine-Design
router.get('/magazineAds',function(req,res){
   res.render('magazineAds'); 
});

//Banner-Design
router.get('/bannerAds',function(req,res){
   res.render('bannerAds'); 
});

//Digital Ads
router.get('/digitalAds',function(req,res){
   res.render('digitalAds'); 
});

//Newspaper Ads Ads
router.get('/newspaperAds',function(req,res){
   res.render('newspaperAds'); 
});

//T-Shirt-Design
router.get('/T-Shirt',function(req,res){
   res.render('T-Shirt'); 
});

module.exports = router;