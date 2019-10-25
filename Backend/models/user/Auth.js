const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const moment=require('moment');

const authSchema=new Schema({
    name:{type:String,required:true},
    owner:{type:Boolean},
    information:{
        imageSrc:{type:String,default:''},
        parkingaddress:{type:String},
        contactphone:{type:String},
        place:{type:Number}
    },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    date:{ type:Date,default:() => moment().format("MM.DD.YYYY")}
})

module.exports=mongoose.model('userauths',authSchema)