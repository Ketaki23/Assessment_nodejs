let CustomerModel = require('../models/customer.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let express = require('express');
let router = express.Router();

router.post('/login', (req, res) => {
  // save logic req.body
  if (Object.keys(req.body).length === 0) {
      return res.status(400).send('Request body is missing!');
  }
  
  CustomerModel.find({ email: req.body.email})
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed 0"
      });
    }
    console.log("req.body.email :- ", req.body.email, req.body.password, user[0].password);
    bcrypt.compare(req.body.password,user[0].hash_password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed 1"
        });
      }
  if (result) {
      console.log("result: -", result);
      console.log("user[0].email : -", user[0].email);
      console.log("user[0].id : -", user[0].id);
      const token = jwt.sign({
          email: user[0].email,
          userId: user[0].id
      },
      process.env.JWT_KEY,
      {
          expiresIn: "1h"
      })
    return res.status(200).json({
        message: "Auth successful 1",
        token:token
      });
  }
  console.log(err);
  res.status(401).json({ 
      message: "Auth failed 2"
   });
   });
 })
 .catch(err => {
  console.log(err);
  res.status(500).json({
    error: err
  });
});
});


module.exports = router