var express     = require("express");


var app         = express();

app.get("/", function(req, res){
  res.send("Hello to Anissa, can you see me?");
});

app.listen(3001, function(){
  console.log("Your server is aliiive!!");
});
