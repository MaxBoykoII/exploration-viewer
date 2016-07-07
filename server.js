var express = require('express'),
    app = express(),
    request = require('request');

//GoldMinerPulse API urls
var demo_base = "https://www.goldminerpulse.com/_demo789/edp-api-v3a.php?";

//serve client and bower_components 
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

//routes for querys and valid dates 
app.get('/edp-api-v3a.php', function(req, res) {
    var date = req.query.m,
        query = request(demo_base + 'm=' + date);
    console.log(date);
    query.pipe(res);
    query.on('end', function() {
        res.end();
        console.log("response ended!");
    });

});


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    console.log("server is listening...");
});
