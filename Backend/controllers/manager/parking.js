const errorHandler=require('../../utilites/errorHadler');
const Parking=require('../../models/manager/parking');

module.exports.addParking= async function(req,res){
    try{
        const parkingdata= await new Parking({
          city:req.body.city,
          district:req.body.district,
          street:req.body.street,
          building:req.body.building,
          numberOfPlace:req.body.numberOfPlace,
          imageSrc:req.file ? req.file.path :'',
          security:req.body.security,
          information:req.body.information
        }).save()
        res.status(201).json(parkingdata)
       
        
    }
    
    
    catch(e){
        errorHandler(res,e)
       
        
    }
}

module.exports.delete=async function(req,res){
    try{
            await Parking.remove({_id:req.params.id})
            res.status(200).json({message:"Паркінг видалений"})
    
    }
    catch(e){
        errorHandler(res,e)
    }
    
}
module.exports.getById=async function(req,res){
    try{
        const getId= await Parking.findById(req.params.id)
        res.status(200).json(getId)   
           
    }
    
    catch(e){
        errorHandler(res,e)
    }

}
module.exports.getAllparkings= async function(req,res){
    try{
        const allparking= await Parking.find().sort({city:1})
        res.status(200).json(allparking);  
    }
    catch(e){
        errorHandler(res,e)
    }
}