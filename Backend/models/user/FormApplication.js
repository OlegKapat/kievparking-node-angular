const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const moment=require('moment');

const applicationSchema=new Schema({
    name:{type:String},
    city:{type:String},
    district:{type:String},
    street:{type:String},
    place:{type:Number},
    from:{type:String,default:() => moment().format("MM.DD.YYYY")},
    to:{type:String,default:() => moment().format("MM.DD.YYYY")},
    description:{type:String},
    userId:{ref:'userauths',type:Schema.Types.ObjectId}
})
module.exports=mongoose.model('application',applicationSchema)