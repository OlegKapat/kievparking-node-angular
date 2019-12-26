const mongoose=require('mongoose')
const Schema=mongoose.Schema

const contactSchema=new Schema({
    email:{type:String, required:true},
    name:{type:String,required:true},
    phone:{type:String},
    text:{type:String,required:true}
})
module.exports=mongoose.model('contact',contactSchema)