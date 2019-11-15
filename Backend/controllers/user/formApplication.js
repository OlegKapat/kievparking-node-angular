const errorHandler=require('../../utilites/errorHadler');
const Application=require('../../models/user/FormApplication');
const userAuth=require('../../models/user/Auth');


const moment=require('moment');


module.exports.addApplication= async function(req,res){
 
    const registereduser= await userAuth.findById(req.user._id)
    
    try{
        if(registereduser){
            const applicationForm=await new Application({
             name:registereduser.name,
             city:registereduser.information.city,
             district:registereduser.information.district,
             street:registereduser.information.parkingaddress,
             place:registereduser.information.place,
             from:moment(req.body.picker1).format("DD.MM.YYYY"),
             to:moment(req.body.picker2).format("DD.MM.YYYY"),
             description:req.body.form.description,
             userId:req.user._id,
             
             
            }).save()
            res.status(201).json(applicationForm)
                   console.log(getparking);
                   
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
     res.status(200).json(oneparking)
    }
    catch(e){
        errorHandler(res,e)
    }
}