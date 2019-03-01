let express = require('express');

let app = express();
let path = require('path');
let personRoute = require('./routes/person');
let customerRoute = require('./routes/customer');
let commentRoute = require('./routes/comments');
let loginRoute = require('./routes/login');
let bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.json());
app.use(personRoute);
app.use(customerRoute);
app.use(commentRoute);
app.use(loginRoute);

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl} ${req.body}`);
    next()
})
app.use((req, res,  next) => {
    res.status(404).send('we think you are lost!!!')
})

// 500 - Internal server error

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'));
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack)
})

app.use(express.static('public'))


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.info(`Server has started on ${PORT}`))
