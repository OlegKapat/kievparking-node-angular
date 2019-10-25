const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose=require('mongoose');
const ManagerAuth=mongoose.model('managerauths');
const UserAuth=mongoose.model('userauths');
const secretkey=require('../config/keys')

const options={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:secretkey.secretkey
}

module.exports=passport=>{
    passport.use(new JwtStrategy (options, async(payload, done)=>{
        try{
            const user= await UserAuth.findById(payload.userId).select('email id')
            const manager= await ManagerAuth.findById(payload.managerauthId).select('name id')
            if(user || manager){
                return done(null, user || manager)
            }
            else{
                return done(null,false)
            }
          }
        catch(e){}
           console.log(e);
           
    }))
}

