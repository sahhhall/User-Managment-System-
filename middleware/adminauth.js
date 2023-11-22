const isLogin=async(req,res,next)=>{
    try{
        if(req.session.userid){
            next();
        }else{
            res.redirect('/admin');
        
        }
      
    }catch(error){
        console.log(error.message)
    }
}

const isLogout= async(req,res,next)=>{
    try{
        if(req.session.userid){
            res.redirect('/admin/home');
        }
      
        next();

    }
    catch(error){
        console.log(error.message)
    }
}


module.exports={
    isLogin,
    isLogout
}