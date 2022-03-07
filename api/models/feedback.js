const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({ //defines how product should look like
  _id: mongoose.Schema.Types.ObjectId, //consturctor function
  name:{type:String, required:true},
  email: {type:String, required: true},
  message: {type:String, required: true},
});

module.exports = mongoose.model('Feedback', feedbackSchema); 