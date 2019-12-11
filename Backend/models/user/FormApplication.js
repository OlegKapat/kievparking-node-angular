const mongoose=require('mongoose');
const moment=require('moment')
const Schema=mongoose.Schema;


const applicationSchema=new Schema({
    name:{type:String},
    city:{type:String},
    district:{type:String},
    street:{type:String},
    place:{type:Number},
    from:{type:Date, default:()=>moment().format('DD.MM.YYYY')},
    to:{type:Date,default:()=>moment().format('DD.MM.YYYY')},
    description:{type:String},
    userId:{ref:'userauths',type:Schema.Types.ObjectId},
    parkingId:{ref:'parking',type:Schema.Types.ObjectId},
})
module.exports=mongoose.model('application',applicationSchema)