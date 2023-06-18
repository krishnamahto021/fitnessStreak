const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const mongoStore = require('connect-mongo');
const cors = require('cors');

// require files for connect-flash
const connectFlash = require('connect-flash');
const customMware = require('./config/middleware');


// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// to use the google strategy
const passportGoogle = require('./config/passport-google-oauth2-strategy');




// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// setup the socket.io for chatting
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server listening on port : 5000');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

// for viewing uploaded file
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 80 * 100)
    },
    store:new mongoStore({
        mongoUrl:'mongodb://127.0.0.1/fitness_streak_db',
    },
    {
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        console.log(err||'successfully added mongo store')
    }
    
    )
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// //using the connect-flash to show notifications
app.use(connectFlash());
app.use(customMware.setFlash);


// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
