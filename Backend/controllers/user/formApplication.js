const errorHandler=require('../../utilites/errorHadler');
const Application=require('../../models/user/FormApplication');
const userAuth=require('../../models/user/Auth')

module.exports.addApplication= async function(req,res){
    try{
        const applicationForm=await new Application({

        }).save()
        res.status(201).json(applicationForm)
        
    }
    catch(e){
        errorHandler(res,e)
    }
}