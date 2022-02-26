const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const apirouter = express.Router();

const ideaData=require('./dummyData.js');

// for serving the frontend 
app.use("/static",express.static('public'))

// for reading/parsing the form data.
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

let loggedin=false;

app.get("/",(req,res)=>{
    if(loggedin)
    return res.status(200).sendFile(__dirname+'/pages/dashboard.html');
    return res.status(200).sendFile(__dirname+'/pages/index.html');
})

apirouter.get('/ideas',(req,res)=>{
    return res.status(200).json(ideaData);
})

app.use('/api',apirouter);

app.post('/login',(req,res)=>{
    console.log(req.body);
    loggedin=true;
    return res.status(200).redirect('/');
})


module.exports = app;