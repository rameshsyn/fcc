var express = require("express");
var hbs = require("express-handlebars");
var path = require("path");
var app = express();
var upload = require("multer")({ dest: 'uploads/'});



app.set("port",process.env.PORT || 8080);
app.engine("hbs", hbs({ extname: "hbs", defaultLayout: "main", layoutsDir: __dirname + "/views"}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/public")));

app.get('/', function(req, res, next) {
	res.render('main'); // renders main when request to homepage '/'
});

// multipart form data handlers
app.post('/', upload.single('file'), function(req,res,next){
	// responds with file meta data
	res.json({
		name: req.file.originalname,
		size: req.file.size
	});

});


app.listen(app.get("port"), function(){
	console.log("App is running at port " + app.get("port"));
});