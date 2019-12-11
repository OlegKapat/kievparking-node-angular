const express=require('express');
const router=express.Router();
const passport=require('passport');
const controller=require('../../controllers/user/formApplication')
const controllerParking=require('../../controllers/manager/parking')

router.post('/addapplication',passport.authenticate('jwt',{session:false}), controller.addApplication);
router.post('/getstreet/',passport.authenticate('jwt',{session:false}),controller.getstreet);
router.get('/getone/:id',passport.authenticate('jwt',{session:false}), controller.getparking);
router.get('/getapplication/:id',passport.authenticate('jwt',{session:false}),controller.getApplicationById)

module.exports=router;