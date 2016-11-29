var express = require("express");
var app = express();

app.set('port',process.env.PORT || 8080);

app.get('/api/whoami',function(req,res) {
    var lan = req.headers['accept-language'];
    var soft = req.headers['user-agent'];
    lan = lan.match(/.+,/g).toString();
    soft = soft.match(/\(.+?\)/).toString();
    
    res.json({
       'ipaddress': req.headers['x-forwarded-for'] || res.connection.remoteAddress,
       'language': lan,
       'Software': soft
    });
    
});
app.listen(app.get('port'),function(){
    console.log('App running in port 8080');
});



