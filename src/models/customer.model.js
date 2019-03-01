let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mydb", {useNewUrlParser: true})
.then(() => {
    console.log('Connected to the database!');
})
.catch((err) => {
    console.log('Connection failed', err);
});

let CustomerSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    password: String,
    hash_password:String,
    bloodgroup:String,
    phonenumber:{
        type:Number,
        require:true
    },
    gender:String,
    address:String,
    email: {
        type: String,
        require: true,
        unique: true
    }

});

module.exports = mongoose.model('customer', CustomerSchema);