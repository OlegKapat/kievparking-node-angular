const errorHandler=require('../../utilites/errorHadler');
const Rent=require('../../models/user/Rent')
const Auth=require('../../models/user/Auth')
const Application=require('../../models/user/FormApplication')
const moment=require('moment')


module.exports.addrentparking = async function(req,res){
   const registereduser=await Auth.findById(req.user._id)
  try{
      if(registereduser){
         const rentForm=new Rent({
           termstatus:req.body.termstatus,
           confirmstatus:req.body.confirmstatus,
           from:req.body.start,
           to:req.body.end,
           userId:req.user._id,
           parkingForRentId:req.body.parkingForRentId
         }).save()
         
         res.status(201).json(rentForm)    
      
      }
      else 
      {
         res.status(401).json({message:"Помилка данних"})
      }
   }
   catch(e){
      errorHandler(res,e)
   }
}

module.exports.getRentById = async function(req,res){
   const parkingId=await Application.findById({_id:req.params.id});
   try{
         getrent= await Rent.find({parkingForRentId:parkingId}).where({confirmstatus:false})
         res.status(201).json(getrent)     
   }
   catch(e){
   errorHandler(res,e)
   }
}