var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*Need a counter collection because Mongodb has no autoincrementer
but by doing it this way we can take advantage of creating an id
and pulling that into the main table.*/
var CounterSchema = Schema({
  _id:  { type: String, required: true},
  seq:  { type: Number, default: 0 }
});



//make a counter model
var counter = mongoose.model("counter", CounterSchema);


//schema for my url links
var urlSchema = new Schema({
  _id: {type: Number, index: true},
  long_url: String,
  created_at: Date
});


// The pre('save', callback) executes the callback function
// every time before an entry is saved to the urls collection.
urlSchema.pre('save', function(next){
  var doc = this;
  // find the url_count and increment it by 1
  //$inc takes an object of the property and how many to increment it by.
  counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
      if (error)
          //TODO: Look up next();
          return next(error);
      // set the _id of the urls collection to the incremented value of the counter
      doc._id = counter.seq;
      doc.created_at = new Date();
      next();
  });
});


//make a Url model
var Url = mongoose.model("Url", urlSchema);

//export Url
module.exports = Url;
