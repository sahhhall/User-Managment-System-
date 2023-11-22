const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/user_managment");


const express=require("express");
const app=express();

const path=require('path');
const nocache=require("nocache")

app.use(nocache());
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))
// user routes 
const userRoute = require('./routes/userRoutes');
app.use('/',userRoute);


// using admin route 
const adminRoute = require('./routes/adminRoute');

app.use('/admin',adminRoute);

app.listen(3000,()=>{
    console.log("Listennig to the server on http://localhost:3000/")
})