var express = require("express");
var path = require('path');
var app = express();
var route = require("./routes/index");

// setting port
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set(express.static(path.join(__dirname,'public')));

app.use('/', route);


// listening to port 8080
app.listen(app.get('port'),function(){
    console.log("It is running in 8080");
});
