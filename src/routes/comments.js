let CommentsModel = require('../models/comments.model');
let express = require('express');
let router = express.Router();

// Create a new customer - POST API
router.post('/comments', (req, res) => {
    // save logic req.body
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send('Request body is missing!');
    }
    let model = new CommentsModel(req.body);
    model.save()
    .then(doc => {
        if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
        }
        res.status(201).send(doc);
    })
    .catch(err => {console.log('err : -', err)
        res.status(500).json(err);
    });
});
router.put('/comments',(req, res) =>{
    if(Object.keys(req.body).length ===0){
        return res.status(400).send('Request body is missing !!');
    }
    CommentsModel.findOneAndUpdate({
        id: req.params.id
    }, req.body, {new:true})
    .then(doc => {        
        res.status(201).send(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// Delete a customer - delete api
router.delete('/comments', (req, res) => {
    CommentsModel.findOneAndUpdate({
        id: req.query.id
    })
    .then(doc => {        
        res.status(201).send(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

//Get comments Get API
router.get('/comments', (req, res) => {
    CommentsModel.findOne({
        comments: req.query.comments
    })
    .then(doc => {
        res.status(201).send(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

//Get comments Get API
router.get('/comments/getallcomments', (req, res) => {
    CommentsModel.find({})
           .then(doc => {
        res.status(201).send(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// Add Like or Dislike to comments 
router.put('/comments/likedislike',(req, res) =>{
    if(Object.keys(req.body).length ===0){
        return res.status(400).send('Request body is missing !!');
    }
     if((req.body.like == 1 && req.body.dislike == 1)||( req.body.like == 0 && req.body.dislike == 0)){
        return res.status(400).send('Please choose either like or dislike');
      }
      else if(req.body.like == 1){
        CommentsModel.findOneAndUpdate({
            id: req.params.id
        },{$inc: { like: 1 } }, {new:true})
        .then(doc => {        
            res.status(201).send(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
   else if(req.body.dislike == 1){
    CommentsModel.findOneAndUpdate({
        id: req.params.id
    },{$inc: { dislike: 1 } }, {new:true})
   
    .then(doc => {        
        res.status(201).send(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
  } 
  
});


module.exports = router;