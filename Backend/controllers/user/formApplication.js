const errorHandler=require('../../utilites/errorHadler');
const Application=require('../../models/user/FormApplication');
const Auth=require('../../models/user/Auth');
const Rent=require('../../models/user/Rent')
const moment=require('moment');
var nodemailer = require('nodemailer');
const api=require('../../config/keys')


module.exports.addApplication= async function(req,res){
       
    const registereduser= await Auth.findById(req.user._id)
    
    try{
        if(registereduser){
            const applicationForm=await new Application({
             name:registereduser.name,
             city:registereduser.information.city,
             district:registereduser.information.district,
             street:registereduser.information.parkingaddress,
             place:registereduser.information.place,
             from:req.body.picker1,
             to:req.body.picker2,
             description:req.body.form.description,
             userId:req.user._id,
            }).save()
            res.status(201).json(applicationForm)     
                  
        }
        else{
            res.status(401).json({
                messsage:"Користувача не знайдено"
            })
            
        }
    }
    catch(e){
        errorHandler(res,e)
    }

}
module.exports.getstreet= async function(req,res){
    try{
        const street=await Application.find().where({district:req.body.itemDistrict}).sort({data:1})
        res.status(200).json(street)     
    }
    catch(e){
        errorHandler(res,e)
    }
}
module.exports.getparking= async function(req,res){
    try{   
     const oneparking=await (await Application.find({street:req.params.id})).filter(f=>moment(f.to)>moment());
     const findUser=await Auth.findOne({information:{parkingaddress:req.params.id}})
     res.status(200).json({oneparking,findUser})
     
     
    }
    catch(e){
        errorHandler(res,e)
    }
}
module.exports.getApplicationById= async function(req,res){
    try{
     const getAllById=await Application.findById({_id:req.params.id})
     res.status(201).json(getAllById)
    }
    catch(e){
        errorHandler(res,e)
    }
}
module.exports.sendMailConfirm=async function(req,res){
        const getRentId=await Rent.findById({_id:req.params.id}).select('userId')
        const getMail=await Auth.findById({_id:getRentId.userId}).select('email')  
        const getPhone=await Auth.findById({_id:getRentId.userId}).select('contactphone')
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
            subject: 'Підтверження бронювання паркомісця',
            html:'<b>Ваше бронювання в паркінгу підтвержено.</b> <br> <span>Дякуємо що скористались сервісом бронювання паркомісць.<br></span> <site>www.parking.kiev.ua<site>/',
            text: 'Телефон власника' + getPhone.contactphone 

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