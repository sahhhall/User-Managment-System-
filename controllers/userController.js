const User = require('../models/userModel');
const  bcrypt = require('bcrypt');


const securePassword=async(password)=>{

    try{
        const securePass =bcrypt.hash(password,10);
        return securePass;
    }
       
       catch(error){
        console.log(error.message)
       }
}
const loadRegister=async(req,res)=>{
    try{
            res.render('registration')
    }
    catch(error){
            console.log(error.message)
    }
}

// dataaddain
const insertUser=async(req,res)=>{
    try{

        
        const spassword=await securePassword(req.body.password);
           const user=new User({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            password:spassword,
            is_admin:0

            })
             const userData =await user.save();
             if (userData) {
                req.session.user = userData.name;
                res.render("registration", { message: "success" });
              } else {
                res.render("registration", { message: "Something went wrong. Try again" });
              }
            }
    catch(error){
        console.log(error.message)
    }
}

//logn user methods
const loginLoad=async(req,res)=>{
    try{
                res.render('login')
    }
    catch(error){
  console.log(error.message)
    }
}
// verify loagin 
 const verifyLogin=async(req,res)=>{
    try{
        const email=req.body.email;
        
        const pass=req.body.password;
        const userData = await User.findOne({
            $or: [
              { email: email },
              { name: email }
            ]
          });
          
        if(userData){

             const passwordMatch=await bcrypt.compare(pass,userData.password)

             if(passwordMatch){
                    req.session.userid=userData._id;
                    res.redirect('/home');
             }else{
                res.render('login',{msglog:"password incorrect"})
             }
        }
        else{
            res.render('login',{msglog:"User not registered "})
        }
    }catch(error){
        console.log(error.message)
    }
 }

 const loadHome = async(req,res)=>{
    try{
        // const userData=await User.findById({_id:req.session.userid}) 

        const userData=await User.findById({_id:req.session.userid})

      res.render('home',{users:userData});

    }catch(error){
        console.log(error.message)
    }
 }


 const userLogout=async(req,res)=>{
    try{
        req.session.destroy();
        // res.redirect('/');
        res.render('login',{logout:"Logout Successfully"})
       

    }catch(error){
        console.log(error.message)
    }
 }

 
module.exports={
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout
}