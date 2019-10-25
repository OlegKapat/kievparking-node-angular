const express=require('express');
const router=express.Router();
const passport=require('passport');
const controller=require('../../controllers/manager/parking');
const upload=require('../../middleware/uploads');

router.post('/parking',passport.authenticate('jwt',{session:false}),upload.single('image'),controller.addParking);
router.delete('/deleteparking/:id',passport.authenticate('jwt',{session:false}), controller.delete);
router.get('/getoneparking/:id',passport.authenticate('jwt',{session:false}),controller.getById);
router.get('/getparking', passport.authenticate('jwt',{session:false}), controller.getAllparkings)

module.exports=router