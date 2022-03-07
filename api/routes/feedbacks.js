const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const FeedbackController = require('../controllers/feedbacks');
 
//Handle incoming GET requests
router.get('/', checkAuth,FeedbackController.feedbacks_get_all);

//handle incoming POST request to /feedbacks
router.post('/', checkAuth,FeedbackController.feedbacks_create_feedback);

//handle incoming GET request to /feedbacks
router.get('/:feedbackId', checkAuth,FeedbackController.feedbacks_update_feedback);

router.delete('/:feedbackId', checkAuth,FeedbackController.feedbacks_delete_feedback);

module.exports = router