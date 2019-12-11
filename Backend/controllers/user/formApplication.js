const errorHandler=require('../../utilites/errorHadler');
const Application=require('../../models/user/FormApplication');
const Auth=require('../../models/user/Auth');
const Parking=require('../../models/manager/parking')
const moment=require('moment');


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
     const oneparking=await Application.find({street:req.params.id})
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
     console.log(req.params.id);
     
    }
    catch(e){
        errorHandler(res,e)
    }
}