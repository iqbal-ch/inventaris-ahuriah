const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer')
const passport   = require('passport')
const session    = require('express-session')
const bodyParser = require('body-parser')
const env = require('dotenv').load();
const methodOverride = require('method-override')
 
//untuk ngeparse form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(bodyParser.json());

// untuk Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/routes.js')(app,passport);
 
//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

//mengunakan middleware untuk mengakses file static di folder public
app.use(express.static(path.join(__dirname, './app/public')));

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

//For Handlebars
app.set('views',path.join(__dirname,'./app/views'))
app.set('view engine','hbs')

app.get('/', function(req, res) {
    res.render('landing',{layout: false});
});

app.listen(1111, function(err) {
    if (!err)
        console.log("Site is live");
    else console.log(err)
});                     