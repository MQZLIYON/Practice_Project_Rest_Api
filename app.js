//Basic Lib Import
const express = require('express');
const bodyParser = require('body-parser');
const {router} = require('./src/routes/api');
const app = express();

//Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const xss = require('xss-clean');

//Database Lib Import
const mongoose = require('mongoose');

//Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(xss());

//Body Parser Implement
app.use(bodyParser.json());

//Request Rate Limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
})
app.use(limiter);

//Mongodb Database Connection
const URI = "mongodb://localhost:27017/Todo";
const option = {user:'',pass:'',autoIndex:true};
mongoose.connect(URI,option,(error)=>{
    if (error){
        console.log(error);
    }else {
        console.log('Connection Success');
    }
})

//Routing Implement
app.use('/api/v1',router);

//Undefined route Implement
app.use('*',(req,res)=>{
    res.status(404).json({status: 'Failed',data: 'Page Not found'});
});

module.exports = {app};
