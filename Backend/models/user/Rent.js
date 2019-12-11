const mongoose=require('mongoose')
const Schema=mongoose.Schema
const moment=require("moment")

const rentSchema = new Schema({
    termstatus:{type:Boolean},
    confirmstatus:[{type:Boolean}],
    from:[{type:Date,default:() => moment().format("DD.MM.YYYY")}],
    to:[{type:Date,default:() => moment().format("DD.MM.YYYY")}],
    userId:[{ref:'userauths',type:Schema.Types.ObjectId}],
    parkingForRentId:{ref:'parking',type:Schema.Types.ObjectId}
    
})
module.exports=mongoose.model('rentform',rentSchema)