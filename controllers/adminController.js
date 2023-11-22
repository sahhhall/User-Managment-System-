const User = require('../models/userModel');
const  bcrypt = require('bcrypt');

const securePass=async(passoword)=>{
    try{
            const secuerep =bcrypt.hash(passoword,10);
            return secuerep;
    }catch(error){
        console.log(error.message)
    }
}


const loadLogin=async(req,res)=>{

    try{
        res.render('login');
    }catch(error){
        console.log(error.message)
    }
}


const verifyLogin=async(req,res)=>{
    try{
        const email=req.body.email;
        
        const pass=req.body.password;

        const userData=await User.findOne({
            email:email,
            
        })
        if(userData){

         const passwordMatch= await  bcrypt.compare(pass,userData.password);
         if(passwordMatch){

                    if(userData.is_admin===0){
                        res.render('login',{messagenotadmin:"sorry! your not admin"})
                    }
                    else{
                        req.session.userid=userData._id;
                        res.redirect('admin/home');
                    }

         }else{
            res.render('login',{messagee:"enter valid passoword"});
         }
        }else{
            res.render('login',{messagee:"enter valid entry"})
        }
    }
    catch(error){
        console.log(error.message)
    }
}

const  loadDashboard=async(req,res)=>{
    try{
       
         const userData=await  User.find({  is_admin:0 })
        res.render('home',{users:userData})
    }
    catch(error){
        console.log(error.message)
    }
}

const adminLogout=async(req,res)=>{
    try{
            req.session.destroy();
            res.render('login',{log:"Logout Successfully"});
    }catch(error){
        console.log(error.message)
    }

}


// Add new user 

const newUserLoad=async(req,res)=>{
    try{
        res.render('new-user');
    }catch(error){
        console.log(error.message)
    }
}
const addUser= async(req,res)=>{
try{



    const spassword=await securePass(req.body.password);
    const user=new User({
     name:req.body.name,
     email:req.body.email,
     mobile:req.body.mobile,
     password:spassword,
     is_admin:0
     

     })
      const userData =await user.save();
      if (userData) {
        
         res.render("new-user", { message: "success" });
       } else {
         res.render("new-user", { message: "Something went wrong. Try again" });
       }
     }
catch(error){
 console.log(error.message)
}
}

// edit user 

const editUserLoad=async(req,res)=>{
    try{
            const id=req.query.id;
            const userData=await User.findById({_id:id});
            if(userData){
                res.render('edit-user',{user:userData})
            }
            else{
             res.redirect('/admin/home')
            }
           
    }catch(error){
        console.log(error.message)
    }
}

const updateUser=async(req,res)=>{
    try{

     const userData=    await User.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mobile}})
        res.redirect('/admin/home');
    }catch(error){
        console.log(error.message)
    }
}
const deleteUser=async(req,res)=>{
    try{
        const id=req.query.id;
       await User.deleteOne({_id:id});
       res.redirect('/admin/home')
    }catch(error){
        console.log(error.message)
    }
}

module.exports={
    loadLogin,
    verifyLogin,
    loadDashboard,
    adminLogout,
    newUserLoad,
    addUser,
    editUserLoad,
    updateUser,
    deleteUser
}






