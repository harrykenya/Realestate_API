const mongoose = require('mongoose');

const Feedback= require('../models/feedback');


exports.feedbacks_get_all =  (req, res, _next) => {
  const id = req.params.feedbackId;
  Feedback.findById(id)
  .select('name email message')
  .exec()
  .then(doc => {
    console.log("from database", doc);
    res.status(200).json(doc);
    if (doc){
      res.status(200).json({
        feedback: doc,
        request:{
           type: 'GET',
           url:'http://localhost:3000/feedbacks/'
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

exports.feedbacks_create_feedback =  (req, res, _next )  => {
  const feedback = new Feedback({
    _id: new mongoose.Types.ObjectId(),
    name:req.body.name,
    email:req.body.email,
    message: req.body.message,
  });
  feedback.save()
  .then(result => { //save is a method provided by mongoose models
    console.log(result);
    res.status(201).json({
      message:"feedback sent successfully",
      createdFeedback: {
        name:result.name,
        email:result.email,
        message:result.message,
        _id:result._id,
        request:{
          type:'POST',
          url:'http://localhost:3000/feedbacks/'+ result._id
        }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
  }

  exports.feedbacks_update_feedback = (req, res, _next) => {
    const id = req.params.feedbackId;
   const updateOps = {};
   for (const ops of req.body){
     updateOps[ops.propName] = ops.value;
   }
    Feedback.updateOne({_id: id}, {$set: updateOps })
    .exec()
    .then(result =>{
      res.status(200).json({
          message:'feedback added',
          request:{
            type:'GET', 
            url:'http://localhost:3000/feedbacks/'+ id
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

  exports.feedbacks_delete_feedback = (req, res, _next) => {
    const id = req.params.feedbackId;
    Feedback.remove({_id: id })
    .exec()
    .then(_result => {
      res.status(200).json({
        message:'feedback deleted',
        request:{
          type:'GET',
          url:'http://localhost:3000/feedbacks/',
          body:{name:'String',  email: 'String', message: 'Number'}
        }
      });
    })
    .catch(err =>{
      res.status(500).json({
        error: err
      });
    });//removing object in DB that fulfill the criteria
  }