
const isLogin=async(req,res,next)=>{
    try {
        if(req.session.userid){
            next();
        }else{
            res.redirect('/');
        }
    } catch (error) {
        console.log(error.message);
        
    }

}

const isLogout=async(req,res,next)=>{
    try{
        if(req.session.userid){
           return res.redirect('/home');
            
        }
        next();
      
    }
    catch(error){
        console.log(error.messsage)
    }

}
module.exports={
    isLogin,
    isLogout
}