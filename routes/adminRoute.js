const express = require('express');
const admin_route=express();

const session = require('express-session');
const config = require('../config/config');

const adminController=require('../controllers/adminController');

admin_route.use(express.json());
admin_route.use(session({secret:config.sessionSecret,resave:false,
    saveUninitialized:false,}))

admin_route.use(express.urlencoded({extended:true}))

admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin')

const auth=require('../middleware/adminauth')
 
admin_route.get('/',auth.isLogout,adminController.loadLogin)


admin_route.post('/',adminController.verifyLogin);
admin_route.get('/home',auth.isLogin,adminController.loadDashboard);
admin_route.get('/logout',auth.isLogin,adminController.adminLogout);



admin_route.get('/new-user',auth.isLogin,adminController.newUserLoad);
admin_route.post('/new-user',adminController.addUser);
admin_route.get('/edit-user',auth.isLogin,adminController.editUserLoad)
admin_route.post('/edit-user',adminController.updateUser)

admin_route.get('/delete-user',adminController.deleteUser)
admin_route.get('*',(req,res)=>{
    res.redirect('/admin')
})


module.exports=admin_route;