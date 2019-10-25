const express=require('express');
const controller=require('../../controllers/user/auth')
const router=express.Router();
const passport=require('passport');
const upload=require('../../middleware/uploads')


router.post('/login',controller.login);
router.post('/register',upload.single('image'), controller.register);
router.get('/getowner',passport.authenticate('jwt',{session:false}),controller.getOwner);
router.get('/getuser',passport.authenticate('jwt',{session:false}),controller.getUser);
router.delete('/deleteuser/:id',passport.authenticate('jwt',{session:false}),controller.deleteUser);

module.exports=router;