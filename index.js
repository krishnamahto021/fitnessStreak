// setting up the express server
const express = require('express');
const app = express();
const port = 8000;

// setting up the view engine
const path = require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// to set layout
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// to use static files
app.use(express.static('./assets'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// to link database to our project
const db = require('./config/mongoose');


// use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`error in running up the server ${err}`);
    }
    console.log(`server is running up on port : ${port}`);
});
