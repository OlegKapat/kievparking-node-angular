const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const moment=require('moment');

const parkingShema=new Schema({
    city:{type:String,default:"Київ"},
    district:{type:String,required:true},
    street:{type:String,required:true},
    building:{type:String,required:true},
    numberOfPlace:{type:Number},
    information:{type:String},
    security:{type:String},
    imageSrc:{type:String,default:''},
    date:{ type:Date,default:() => moment().format("MM.DD.YYYY")}
})
module.exports=mongoose.model('parking',parkingShema)