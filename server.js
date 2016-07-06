var express = require('express'),
app = express();

//serve client and bower_components 
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("server is listening...");
});
