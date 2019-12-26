const express=require('express')
const router=express.Router();
const passport=require('passport');
const contactController=require('../../controllers/user/contact')

router.post('/sendformemail', contactController.sentcontactform)

module.exports=router