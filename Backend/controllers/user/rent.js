const errorHandler=require('../../utilites/errorHadler');
const Rent=require('../../models/user/Rent')
const Auth=require('../../models/user/Auth')


module.exports.addrentparking = async function(req,res){
   const registereduser=await Auth.findById(req.user._id)
   try{
      if(registereduser){
         const rentForm=new Rent({
           termstatus:false,
           confirmstatus:false,
           from:moment(req.body.start).format("DD.MM.YYYY"),
           to:moment(req.body.end).format("DD.MM.YYYY"),
           userId:req.user._id,
           parkingId:req.body.parkingId
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