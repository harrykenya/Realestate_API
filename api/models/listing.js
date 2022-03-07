const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({ //defines how product should look like
  _id: mongoose.Schema.Types.ObjectId, //consturctor function
  name: {type:String, required: true},
  price: {type:Number, required: true},
  listingImage: {type: String, required:true},
  garage:{type:Number, required:true},
  bedrooms:{type:Number, required:true},
  bathrooms:{type:Number, required:true},
  sqft:{type:Number, required:true},
  listingdate:{type:String, required:true},
  description:{type:String, required:true}
});

module.exports = mongoose.model('Listing', listingSchema); 