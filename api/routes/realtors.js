const express = require('express');
const router = express.Router();
const multer = require('multer');

const RealtorController = require ('../controllers/realtors')
const checkAuth = require('../middleware/check-auth')

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

router.get('/',RealtorController.realtors_get_all);

router.post('/signup',RealtorController.realtor_signup);

router.post('/login',RealtorController.realtor_login);

router.post('/:realtorId',RealtorController.realtors_update_realtor);

router.get('/:realtorId',RealtorController.realtors_get_realtor);

router.delete('/:realtorId',checkAuth, RealtorController.realtor_delete)

module.exports = router