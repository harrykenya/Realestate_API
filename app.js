const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require("fs");

const listingRoutes =require('./api/routes/listings');
const orderRoutes =require('./api/routes/orders');
const userRoutes= require('./api/routes/user');
const realtorRoutes=require('./api/routes/realtor');
const feedbackRoutes=require('./api/routes/feedbacks');

mongoose.connect(
  "mongodb://localhost:27017/mydb",{
  useNewUrlParser: true,
  useUnifiedTopology: true
});//Adding an environment variable
mongoose.Promise = global.Promise;

 //incoming requests 
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
let uploads_dir = 'uploads';
if(!fs.existsSync(uploads_dir)){
  fs.mkdirSync(uploads_dir)
}
app.use(express.json());//extracts json data and makes it easily readable to user
app.use(express.urlencoded({extended:true}));//set to false to support simple bodies for url encoded data
 


//to prevent CORS errors when connecting single page application/server to our API
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin','*'); // value being * giving acces to any origin
    res.header(
          'Access-Control-Allow-HeaderS',
          'Origin, X-Requested-With, Content-Type, Accept, Authorization'// headers being sent along with the request
    );
    if (req.method ==='OPTIONS'){ // incoming request method which gives access to http method used
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // request that will be allowed by api
        return res.status(200).json({});
    }
    next();
});

//routes which should handle requests
app.use('/listings', listingRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/realtor',realtorRoutes);
app.use('/feedbacks',feedbackRoutes)

//error handling
app.use((_req, _res, next)=>{
  const error = new Error('not found');
  error.status = 404;
  next(error);//forward error request
});

app.use((error,_req, res, _next) => {
  res.status(error.status || 500);
  res.json({
    error: { 
      message: error.message
    }
  });
});

module.exports = app;
