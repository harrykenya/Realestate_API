const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({ //defines how product should look like
  _id: mongoose.Schema.Types.ObjectId, //consturctor function
  product: {type: mongoose.Schema.Types.ObjectId, ref:'Product'}
  ,quantity: {type:Number, default: 1}    
});

module.exports = mongoose.model('Order', orderSchema); 