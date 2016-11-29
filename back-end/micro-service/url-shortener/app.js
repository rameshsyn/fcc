var express = require("express");
var path = require("path");
var hbs = require("express-handlebars");
var routes = require("./routes/routes").router;
var app = express();

app.set('port', process.env.PORT || 8080);
app.engine('hbs',hbs({extname: 'hbs', defaultLayout: 'index', layoutsDir: __dirname + '/views'}));
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,"public")));

app.use('/', routes);

app.listen(app.get('port'),function() {
    console.log("Server is running at " + app.get('port'));
});