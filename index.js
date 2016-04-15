var express     = require("express");
var app         = express();
var hbs         = require("express-handlebars");
var mongoose    = require("mongoose");
var path        = require("path"); //helps make path manipulation easier.
var bodyParser  = require("body-parser");
var config      = require("./config");
var base58      = require("./base58.js");

var Url         = require("./models/url");

//FIXME: I feel like this line may cause deployment issues later.
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//tells Express to serve files from our public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
  //route to serve up the homepage
  res.render("index-view");
});

//This route that will handle the incoming POST request
app.post("/api/shorten", function(req, res){
  console.log(req.body);
  console.log(req.body.url);
  var longUrl  = req.body.url;
  var shortUrl = '';

  //check to see if url already exists in db
  Url.findOne({long_url: longUrl}, function(err, doc){
    if(doc){
      //url has already been shortened
      shortUrl = config.webhost + base58.encode(doc._id);
      res.send({'shortUrl': shortUrl});
    }else{
      //longurl not found so create a new entry.
      var newUrl = Url({
        long_url: longUrl
      });

      //save new link
      newUrl.save(function(err){
        if(err){
          console.log(err);
        }

        //make the short url
        shortUrl = config.webhost + base58.encode(newUrl._id);

        res.send({'shortUrl': shortUrl});
      });
    }
  });
});


app.get('/:encoded_id', function(req, res){
  var base58Id = req.params.encoded_id;
  var id = base58.decode(base58Id);

  // check if url already exists in database
  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      // found an entry in the DB, redirect the user to their destination
      res.redirect(doc.long_url);
    } else {
      // nothing found, take 'em home
      res.redirect(config.webhost);
    }
  });
});

app.listen(3001, function(){
  console.log("Your server is aliiive!!");
});
