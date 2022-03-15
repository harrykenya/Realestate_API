const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const ListingsController = require('../controllers/listings');

const storage = multer.diskStorage({
  destination: function(req, _file, cb){
      cb(null,'uploads');
  },
  filename: function(req, file, cb){
    cb(null, new Date().getTime()+ file.originalname);
  }
});

const fileFilter = (req,file,cb)=>{
  //reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
}else{
    cb(null, false);
  }
};

const upload= multer({
  storage: storage, 
  limits:{
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


  router.get('/',ListingsController.listings_get_all );

  router.post('/', upload.single('listingImage'),ListingsController.listings_create_listing);

  router.get('/:listingId',ListingsController.listings_get_listing);

  router.patch('/:listingId', ListingsController.listings_update_listing);

  router.delete('/:listingId', ListingsController.listings_delete_listing);

module.exports = router;