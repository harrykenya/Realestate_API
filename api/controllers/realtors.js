const  mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Realtor = require('../models/realtor');

exports.realtors_get_all =  (req, res, _next) => {
  Realtor.find()
  .select('name email realtorImage')
  .exec()
  .then(doc => {

    if (doc){
      res.status(200).json({
        realtor: doc,
        request:{
           type: 'GET',
           url:'http://localhost:3000/realtors/'+ doc._id
        }
      });
    }else{
      res.status(404).json({message:'No valid entry found for provided ID'});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err});
  });
}


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
            realtorImage:req.body.realtorImage,
            name:req.body.name,
            email:req.body.email,
            password: hash
          });
          console.log()
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
              name:realtor[0].name,
              email:realtor[0].email,
              realtorImage:realtor[0].realtorImage,
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

exports.realtors_update_realtor = (req, res, _next) => {
  const id = req.params.realtorId;
 const updateOps = {};
 for (const ops of req.body){
   for(let key of Object.keys(ops)){
    updateOps[key] = ops[key];
   }   
 }
  Realtor.updateOne({_id: id}, {$set: updateOps })
  .exec()
  .then(result => {
    res.status(200).json({
        message:'Realtor updated',
        request:{
          type:'POST', 
          url:'http://localhost:3000/realtors/'+ id
        }
    });
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
}

exports.realtors_get_realtor =  (req, res, _next) => {
  const id = req.params.realtorId;
  Realtor.findById(id)
  .select('name email realtorImage')
  .exec()
  .then(doc => {
    console.log("from database", doc);
    res.status(200).json(doc);
    if (doc){
      res.status(200).json({
        realtor: doc,
        request:{
           type: 'GET',
           url:'http://localhost:3000/realtors/'
        }
      });
    }else{
      res.status(404).json({message:'No valid entry found for provided ID'});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err});
  });
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