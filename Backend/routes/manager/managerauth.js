const express=require('express');
const controller=require('../../controllers/manager/managerauth')
const router=express.Router();
const passport=require('passport');

router.post('/menagerlogin',passport.authenticate('jwt', { session: false }),controller.login);
router.post('/managerregister',passport.authenticate('jwt', { session: false }),controller.register);
router.post('/getmanager/:id',passport.authenticate('jwt', { session: false}),controller.getlogin)

module.exports=router;