var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
mongoose.connect(process.env.MONGOLAB_URI); // connects to data database

// informs database connection
mongoose.connection.once('open',function(){
   console.log("DB connected !");
});
var Schema = mongoose.Schema;

// makes new url schema 
var urlSchema = new Schema({
   original_URL: String,
   shorten_URL: String,
   shorten_id: Number
});

// makes model of urlSchema schema
var Url = mongoose.model("Url",urlSchema);

// generates random number
function ranNum() {
   return Math.floor(Math.random() * 10000);
}

// serves to the index
router.get('/',function(req, res){
   res.render('index');
});

// redirects to the original url
router.get('/:id',function(req,res,next){
   if(req.params.id !== "favicon.ico") {
    Url.find({shorten_id: Number(req.params.id)},function(err, url){   
         if(err) throw err;    
         res.redirect(url[0].original_URL);
       });
   }
   else {
   res.render('index');
 }
   
});
// warns if url is not passed
router.get('/new/',function(req, res, next) {
   res.json({"error": " Pass URL !"}); 
});

// if url is passed
router.get('/new/*', function(req, res, next) {
   var shorten_id = ranNum();
   var url = req.url.slice(5);
   var validUrl = url.match(/((https?\:\/\/[www\.]?))\w+\.\w+(\.\w+\/)?(\/)?([\w\.\?#=]+)?/g);
   if(validUrl) {
      var newUrl = new Url({
      original_URL: url,
      shorten_URL: "https://bit-url.heruko.com/" + shorten_id,
      shorten_id: shorten_id
   });
   newUrl.save(); // saves to the database
   res.json({
         original_URL: url,
         shorten_URL: "https://bit-url.heruko.com/" + shorten_id
   });
   }
   else {
      res.json({
         status: "Invalid URL"
      })
   }

});

module.exports = {
   router: router,
   Url: Url
   
};