const express = require('express');
const bodyParser =require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');

const items_controller = require('./controllers/items_controller');


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loca');
let db = mongoose.connection;

db.once('open', function(){
   console.log('Connected to MongoDB');
});

db.on('error', function(err){
    console.log(err);
});


/*n
var logger = function(req, res, next){
    console.log('Logging...');
    next();
}

app.use(logger);
*/
var app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

// Global Vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

// Express Validator Middleware
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

var users = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com',
    },
    {
        id: 2,
        first_name: 'Bob',
        last_name: 'Smith',
        email: 'bobsmith@gmail.com',
    },
    {
        id: 3,
        first_name: 'Jill',
        last_name: 'Jackson',
        email: 'jilljackson@gmail.com',
    }
]


app.get('/items', items_controller.list);

app.get('/', function(req, res){
    res.render('index', {
        title: 'Customers',
        users: users
    });
});

app.post('/users/add', function(req, res){

    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('index', {
            title: 'Customers',
            users: users,
            errors: errors
        });
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email_name: req.body.email
        }

        console.log('SUCCESS');
    }
});

app.listen(3000, function(){
  console.log('Server Started on Port 3000...');
})