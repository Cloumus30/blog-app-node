require("dotenv").config();
const path = require('path');
const express = require("express");

const fileUpload =  require('express-fileupload');
const session = require('express-session');
const {flash} = require('express-flash-message');
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT||3000;

// Import routers
const dashboardRoutes = require(path.join(__dirname+'/routers/dashboard-routes'));
const postRoutes = require(path.join(__dirname+'/routers/post-routes'));
const imageRoutes = require(path.join(__dirname+'/routers/image-routes'));
const authRoutes = require(path.join(__dirname+'/routers/auth-routes'));

const {checkToken,currentUser} = require(path.join(__dirname,'middleware/auth-middleware'));

app.set('view engine' , 'ejs');
app.set('views' , './views');

app.use(fileUpload());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// express-session
app.use(
    session({
        secret: 'blog-cloudy',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash({sessionKeyName:'flashMessage'}));
app.use(cookieParser());

app.use(authRoutes);
// app.use(checkToken);
// app.use(currentUser);

// Using Imported Routers
app.use(dashboardRoutes);
app.use(postRoutes);
app.use(imageRoutes);

app.listen(port,()=>{
    console.log(`Listen at port: ${port}`);
})
