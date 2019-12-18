const errorHandler=require('../../utilites/errorHadler');
const Rent=require('../../models/user/Rent')
const Auth=require('../../models/user/Auth')
const Application=require('../../models/user/FormApplication')
const moment=require('moment');
const nodemailer=require('nodemailer');
const api=require('../../config/keys')


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
   const parkingId=await Application.findOne({userId:req.user.id});
   try{
         getrent= await Rent.find({parkingForRentId:parkingId})
         res.status(201).json(getrent) 
              
   }
   catch(e){
   errorHandler(res,e)
   }
}
module.exports.confirmstatus=async function(req,res){
   try{
         const status=await Rent.findOneAndUpdate(
            {_id:req.params.id},
            {$set:{confirmstatus:req.body.status}},
            {new:true}
            )
            res.status(200).json(status);

   }
   catch(e){
      errorHandler(res,e)
   }
}
module.exports.getAllResservedParkings=async function(req,res){
   try{
      const applicationId=await Application.findById({_id:req.params.id})
        const allreserved=await Rent.find({parkingForRentId:applicationId})
        res.status(201).json(allreserved)   
   }
   catch(e){
      errorHandler(res,e)
   }
}
module.exports.getMailReservation=async function(req,res){
   const getRentId=await Application.findById({_id:req.params.id}).select('userId')
   const getMail=await Auth.findById({_id:getRentId.userId}).select('email')  
   try{
      var transporter = nodemailer.createTransport({
         host: 'smtp.ukr.net',
         port:465,
         secure:true,
         auth: {
           user: api.email,
           pass: api.password
         }
       });
       
       var mail = {
         from: 'serviceparking@ukr.net',
         to: getMail.email,
         subject: 'Новий запит на бронювання',
         //text: 'Hi, mail sent.',
         html:'<b>Вам надійшов запит на бронювання місця в паркінгу.</b> <br> <span>Перейдіть на сайт для підтверження.<br></span> <site>www.parking.kiev.ua<site>/'
       };
       
       transporter.sendMail(mail, (error, info)=>{
         if (error) {
           console.log(error + " Лист не відправлено");
         } else {
           console.log('Лист відправлено: ' + info.response);
         }
       });
   }
   catch(e){
      errorHandler(res,e)
   }
}