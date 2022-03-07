const  mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Realtor = require('../models/realtor');


exports.realtor_signup = (req, res, _next)=>{
Realtor.find({email:req.body.email})
  .exec()
  .then(realtor =>{
    if (realtor.length >= 1 ){
      return res.status(409).json({
        message:'mail exists'
      })
    }else{
      bcrypt.hash(req.body.password, 10,(err,hash)=>{
        if(err){
          return res.status(500).json({
            error:err
          });
        }else{
          const realtor = new Realtor({
            _id: new mongoose.Types.ObjectId(),
            email:req.body.email,
            password: hash
          });
          realtor
          .save()
          .then(result=>{
            console.log(result);
            res.status(201).json({
              message:'Realtor created'
            });
          })
          .catch(err=>{
            console.log(err);
            res.status(500).json({
              error: err});
          });
        }
      });
    }
  })
}

exports.realtor_login = (req,res,_next)=>{
  Realtor.find({email:req.body.email})
  .exec()
  .then(realtor=> {
    if(realtor.length < 1){
      return res.status(401).json({
        message:'Auth failed'
      });
    }
    bcrypt.compare(req.body.password,realtor[0].password,(err,result)=>{
       if(err){
         return res.status(401).json({
           message: 'Auth failed'
         });
       } 
       if (result){
          const token = jwt.sign(
            {
              email:realtor[0].email,
              realtorId: realtor[0]._id
            }, 
            process.env.JWT_KEY, 
            {
                expiresIn:'1h'
            }
          );
          return res.status(200).json({
            message:'Auth succesful',
            token: token
          });
       };
       res.status(401).json({
         message: 'Auth failed'
       });
  })
})
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
}

exports.realtor_delete = (req, res, _next) =>{
  Realtor.remove({_id: req.params.realtorId})
  .exec()
  .then(_result => {
    res.status(200).json({
      message:'realtor deleted'
    })
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
 }