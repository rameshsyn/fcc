var express = require("express");
var router = express.Router();


router.get('/',function(req,res){
   res.render('index'); 
});

router.get('/:time',function(req,res){
   var time = req.params.time;
   var timestamp = Date.parse(time);
   var unix,natural;
    if (isNaN(timestamp) == false) {
      unix = Date.parse(new Date(timestamp));
      natural = new Date(timestamp).toLocaleDateString();

    }
    else if(typeof Number(time) === 'number') {
        unix = Number(time);
        natural = new Date(unix).toLocaleDateString();
    }
    else {
        unix = null;
        natural = null;
    }
     res.json({
         unix: unix,
         natural: natural
     }); 
});

module.exports = router;