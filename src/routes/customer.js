let CustomerModel = require('../models/customer.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let express = require('express');
let router = express.Router();

// Create a new customer - POST API
router.post('/customer', (req, res) => {
    // save logic req.body
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send('Request body is missing!');
    }
    let model = new CustomerModel(req.body);
    if (req.body.password) {
        model.hash_password = bcrypt.hashSync(req.body.password, 10);
    }
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

router.get('/customer', (req,res) =>{
    CustomerModel.findOne({
        email:req.query.email
    })
    .then(doc => {
        res.status(201).send(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.put('/customer',(req, res) =>{
    if(Object.keys(req.body).length ===0){
        return res.status(400).send('Request body is missing !!');
    }
     CustomerModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {new:true})
    .then(doc => {        
        res.status(201).send(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.delete('/customer',(req, res) =>{
    if(!req.query.email){
        return res.status(400).send('Missing URL parameter: email')
    }
    CustomerModel.findOneAndRemove({
        email: req.query.email
    })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    }); 
});

module.exports = router;