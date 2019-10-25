const express=require('express');
const router=express.Router();
const passport=require('passport');
const controller=require('../../controllers/user/formApplication')

router.post('/addapplication',passport.authenticate('jwt',{session:false}), controller.addApplication);

module.exports=router;