var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mailer = require('express-mailer');
var nodemailer = require('nodemailer');
var compression = require('compression');
var zlib = require('zlib');
var https = require('https');
var fs = require('fs');
var http = require('http');
var GoogleStrategy = require('passport-google').Strategy;
var TwitterTokenStrategy = require('passport-twitter').Strategy;
var moment = require('moment');




// Init App
var app = express();





//Secure Making

var options = {

 key: fs.readFileSync('doc/pki-validation/AC8622A83AF96182CB7D1AF707E3E5EE.txt')

};

//Routes

var num = 0;



//Routes
var routes = require('./routes/index');

//Compression

app.use(compression());




// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'vendor')));


// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.branding = req.branding || null;
  res.locals.user = req.user || null;
  res.locals.twitteruser = req.twitteruser || null;
    
  next();
});



app.use('/', routes);





//Index Mailer

app.post('/send',(req,res) =>{
    
    var name = req.body.name;
    var email = req.body.email;
    var username  = req.body.subject;
    var comment  = req.body.comment;
    
        //Validations
    
    req.checkBody('name', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').isEmail();
    req.checkBody('subject', 'subject is required').notEmpty();
    req.checkBody('comment', 'comment is required').notEmpty();
    
    var errors = req.validationErrors();
    
      if(errors)
       {
           res.render('index',{
               errors:errors
           });
       
       }
    
   else{      

           var output = `
    <p>You have new Index Contact Request</p>
    <h3>Index Contact Details</h3>
<ul>

    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Subject: ${req.body.subject}</li>

</ul>
<h3>Message</h3>
<p>${req.body.comment}</p>

`;
    

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.promo.works',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'hello@promo.works', // generated ethereal user
            pass: 'Novelsoft@098'  // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Promo.works 🤳" <hello@promo.works>', // sender address
        to: 'hello@promo.works', // list of receivers
        subject: 'Main Page Contact ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('index', {msg:'Email has been sent'});

    });
       
    
}
});

    
    
   



    
    
   


// Set Port
var server = https.createServer(function(req,res){
res.writeHead(200);
});

app.listen(80,'45.40.160.60');