const mongoose=require('mongoose')
const Schema=mongoose.Schema
const moment=require("moment")

const rentSchema = new Schema({
    rentinfo:[
    {termstatus:{type:Boolean}},
    {confirmstatus:{type:Boolean}},
    {from:{type:String}},
    {to:{type:String}},
    {userId:{ref:'userauths',type:Schema.Types.ObjectId}},
    {parkingId:{ref:'parking',type:Schema.Types.ObjectId}}
    ]
})
module.exports=mongoose.model('rentform',rentSchema)