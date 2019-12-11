const express=require('express');
const router=express.Router();
const rentcontroller=require('../../controllers/user/rent')
const passport=require('passport');

router.post('/addrent',passport.authenticate('jwt',{session:false}),rentcontroller.addrentparking)
router.get('/getrent/:id', passport.authenticate('jwt',{session:false}), rentcontroller.getRentById)

module.exports=router