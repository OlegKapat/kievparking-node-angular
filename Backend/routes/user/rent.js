const express=require('express');
const router=express.Router();
const rentcontroller=require('../../controllers/user/rent')
const passport=require('passport');

router.post('/addrent',passport.authenticate('jwt',{session:false}),rentcontroller.addrentparking)
router.get('/getrent', passport.authenticate('jwt',{session:false}), rentcontroller.getRentById)
router.patch('/changestatus/:id',passport.authenticate('jwt',{session:false}), rentcontroller.confirmstatus)
router.get('/getcurrentstatus/:id',passport.authenticate('jwt',{session:false}),rentcontroller.getAllResservedParkings)
router.get('/sendreservationmail/:id',rentcontroller.getMailReservation)

module.exports=router