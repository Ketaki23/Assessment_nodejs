let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mydb", {useNewUrlParser: true})
.then(() => {
    console.log('Connected to the database!');
})
.catch((err) => {
    console.log('Connection failed', err);
});

let CommentsSchema = new mongoose.Schema({
    comments: String,
    like: Number,
    dislike: Number,
});

module.exports = mongoose.model('comments', CommentsSchema);