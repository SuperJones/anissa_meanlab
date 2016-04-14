var express     = require("express");
var hbs         = require("express-handlebars");
var mongoose    = require("mongoose");
var path        = require("path"); //helps make path manipulation easier.
var app         = express();
var base58      = require("./base58.js");

app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

//tells Express to serve files from our public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
  //route to serve up the homepage
  res.render("index-view");
});

// app.post("", function(req, res){
//
// });
//
// app.get("", function(req, res){
//
// });

app.listen(3001, function(){
  console.log("Your server is aliiive!!");
});
