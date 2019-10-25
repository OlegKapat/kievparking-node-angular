const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const moment=require('moment');

const managerSchema=new Schema({
    name:{type:String,required:true},
    password:{type:String,required:true},
    date:{ type:Date,default:() => moment().format("MM.DD.YYYY")}
})

module.exports=mongoose.model('managerauths',managerSchema);