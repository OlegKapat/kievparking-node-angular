const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const ManagerAuth=require('../../models/manager/ManagerAuth');
const errorHandler=require('../../utilites/errorHadler');
const secretkey=require('../../config/keys')

module.exports.login= async function(req,res){
   const candidate= await ManagerAuth.findOne({name:req.body.name});
   if(candidate){
     const passwordResult=bcrypt.compareSync(req.body.password,candidate.password);
     if(passwordResult){
       const token=jwt.sign({
           name:candidate.name,
           managerauthId:candidate._id
       },secretkey.secretkey,{expiresIn:60*60})
       res.status(200).json({
           token:`Bearer ${token}`,
           message:"Авторизація вдала"
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

module.exports.register= async function(req,res){
    const currentname= await ManagerAuth.findOne({name:req.body.name});
    const salt=bcrypt.genSaltSync(10);
    const password=req.body.password;
    if(currentname){
        res.status(409).json({
            message:"Такий користувач вже існує"
        })
    }
    else{
        const managerauth=new ManagerAuth({
            name:req.body.name,
            password:bcrypt.hashSync(password,salt)
        })
        try{
            await managerauth.save();
            res.status(201).json({
                message:"Користувач створений"
            })
        }
        catch(e){
            errorHandler(e,res);
        }
    }

}
module.exports.getlogin= async function(req,res){
    try{
        const candidate= await ManagerAuth.findOne({name:req.params.id}) 
        if(candidate){
            const passwordResult=bcrypt.compareSync(req.body.password,candidate.password)   
            if(passwordResult){
                res.status(200).json({password:true})
            }
            else{
                res.status(403).json({
                    password:false
                })
        }   
    }
    else{
        res.status(404).json({
            message:"Користувач не знайдений"
        })
    } 
}
catch(e){
    errorHandler(res,e)
}
}