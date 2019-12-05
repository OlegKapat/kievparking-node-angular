const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../../models/user/Auth');
const parking=require('../../models/manager/parking')
const errorHandler=require('../../utilites/errorHadler');
const secretkey=require('../../config/keys');


module.exports.login= async function(req,res){
    try{
        const candidate= await User.findOne({email:req.body.email});
        if(candidate){ 
          const passwordResult=bcrypt.compareSync(req.body.password,candidate.password);
          if (passwordResult){
            const token=jwt.sign({
                email:candidate.email,
                userId:candidate._id
            },secretkey.secretkey,{expiresIn:60*60})
            res.status(200).json({
                token:`Bearer ${token}`,
                userId:candidate._id,
                name:candidate.name,
                owner:candidate.owner
            })
          } else{
              res.status(401).json({
                  message:"Паролі не співпали"
              })
          }
        }
        else{
            res.staus(404).json({
                message:"Користувач не знайдений"
            })
        }
    }
    catch(e){
        errorHandler(res,e)
    }
   
}

module.exports.register= async function(req,res){
    const currentEmail= await User.findOne({email:req.body.email});
    const salt=bcrypt.genSaltSync(10);
    const password=req.body.password;
    if(currentEmail){
        res.status(409).json({
            message:"Такий користувач вже існує"
        })
    }
    else{
        const ownerfield=req.body.owner;   
        //const parkingId= await parking.findOne({street:req.body.findstreet, building:req.body.findbuilding}).select("_id")
        if(ownerfield){
            const user=new User({
                name:req.body.name,
                owner:req.body.owner,
                information:{
                imageSrc:req.file ? req.file.path :'',
                city:req.body.city,
                district:req.body.district,
                parkingaddress:req.body.address,
                contactphone: req.body.phone,
                place:req.body.place,
                parkingId:req.body.parkingId
                },
                email:req.body.email,
                password:bcrypt.hashSync(password,salt)
            })  
            try{
                await user.save();
                res.status(201).json({
                    message:"Власник паркомісця зареєстрований",
                })         
            }
            catch(e){
                 errorHandler(res,e)      
            }
           
        }
        else{   
            const user=new User({
                name:req.body.name,
                owner:req.body.owner,
                email:req.body.email,
                password:bcrypt.hashSync(password,salt)
            })
         
            try{
                await user.save();
                res.status(201).json({
                    message:"Користувач створений"
                })
                
            }
           catch(e){
               errorHandler(res,e)
               
           }

        }
      
    }
    
}
module.exports.getOwner= async function(req,res){
    try{
        const ownerUser= await User.find().where({owner:true})
        res.status(200).json(ownerUser)
       
    }
    catch(e){
        errorHandler(res,e)
    }
    
   
}
module.exports.getUser= async function(req,res){
    try{
        const user=await User.find().where({owner:false})
        res.status(200).json(user)
    }
    catch(e){
        errorHandler(res,e)
    }
}
module.exports.deleteUser=async function(req,res){
    try{
        await User.remove({_id:req.params.id})
    res.status(200).json({message:"Користувач видалений"})
    }
    catch(e){
        errorHandler(res,e)
    }
   
}