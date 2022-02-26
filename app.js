const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const apirouter = express.Router();
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken');

const userData=require('./dummyData.js');

const token_key = process.env.TOKEN_KEY;

// for serving the frontend 
app.use("/static",express.static('public'))

// for reading/parsing the form data.
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieParser());

app.get("/",(req,res)=>{

    const token = req.cookies['login_email'];
  
    if (!token) {
        return res.status(200).sendFile(__dirname+'/pages/index.html');
    }
    try {
      const decoded = jwt.verify(token, token_key);
      const user_email = decoded.user_email;
      let found=false;

    userData.forEach((dt)=>{
        if(dt.email==user_email)
            found=true;
    })
    if(found)
      return res.status(200).sendFile(__dirname+'/pages/dashboard.html');
      
    } catch (err) {
      console.log(err);
      return res.status(500).json("error on server");
    }
    return res.status(200).sendFile(__dirname+'/pages/index.html');
})

app.get("/getIdea",(req,res)=>{
    return res.status(200).sendFile(__dirname+'/pages/addIdea.html');
})

app.get("/profile",(req,res)=>{
    return res.status(200).sendFile(__dirname+'/pages/profile.html');
})

apirouter
.get('/ideas',(req,res)=>{

    let data=[];
    userData.forEach((dt)=>{
        dt.ideas.forEach((ide)=>{
            data.push( {
                name:ide.name,
                domain:ide.domain,
                idea:ide.idea,
                owned:dt.name,
                email:dt.email
            })
        })
    })
    // console.log(data);
    return res.status(200).json(data);
})
.post('/idea',(req,res)=>{
    const {name,domain,idea}=req.body;
    
    if(!name || !domain || !idea)
        return res.status(400).json("data missing");

    const token = req.cookies['login_email'];

    if(!token)
        return res.status(400).json("not logged in");

    try {
      const decoded = jwt.verify(token, token_key);
      const user_email = decoded.user_email;
      let found=false;

    userData.forEach((dt)=>{
        if(dt.email==user_email)
        {
            dt.ideas.push({
                name,
                domain,
                idea
            })
                found=true;
        }
    })
    if(found)
    {
        // return res.status(200).json('idea added');
        return res.status(200).redirect("/");
    }
      
    } catch (err) {
      console.log(err);
      return res.status(500).json("error on server");
    }

    return res.status(400).json("invalid user");
})
.get('/profile',(req,res)=>{
    const token = req.cookies['login_email'];

    if(!token)
        return res.status(400).json("not logged in");

    try {
      const decoded = jwt.verify(token, token_key);
      const user_email = decoded.user_email;
        let data;
        let found=false;
    userData.forEach((dt)=>{
        if(dt.email==user_email)
        {
            found=true;
            data=dt;
        }
    })

    if(found)
    return res.status(200).json(data);
    
    return res.status(400).json("invalid user");
      
    } catch (err) {
      console.log(err);
      return res.status(500).json("error on server");
    }

    
})


app.use('/api',apirouter);

app.post('/login',(req,res)=>{
    
    const {email,password}=req.body;

    if(!email || !password)
        return res.status(400).json("email or password missing");

    let found=false;

    userData.forEach((dt)=>{
        if(dt.email==email && dt.password==password)
            found=true;
    })

    if(found)
    {
        const token = jwt.sign(
            { user_email: email },
            process.env.TOKEN_KEY
          );
        return res.status(200).cookie('login_email',token).redirect('/');
    }
    
    return res.status(400).json('invalid credentials');
});

app.post('/register',(req,res)=>{
    const {name,email,password,checkpassword}=req.body;

    if(!name || !email || !password || !checkpassword)
        return res.status(400).json("data missing");

    if(password!=checkpassword)
        return res.status(400).json("passwords do not match");

    let found=false;

    userData.forEach((dt)=>{
        if(dt.email==email)
            found=true;
    })

    if(found)
    {
        return res.status(400).json("a user exists with this email")
    }

    userData.push({
        name,
        email,
        password,
        ideas:[]
    })

    const token = jwt.sign(
        { user_email: email },
        process.env.TOKEN_KEY
      );

    return res.status(200).cookie('login_email',token).redirect('/');
})


module.exports = app;