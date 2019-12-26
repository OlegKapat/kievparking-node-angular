const errorHandler=require('../../utilites/errorHadler');
const nodemailer = require('nodemailer')
const api=require('../../config/keys')

module.exports.sentcontactform = async function(req,res){
   try{
        var transporter = await nodemailer.createTransport({
            host: 'smtp.ukr.net',
            port:465,
            secure:true,
           auth: {
             user: api.email,
             pass: api.password
           }
         });
        
         var mail = {
          from: api.email,
          to: api.email,
          subject: 'Лист з сайту',
          text: "Лист з сайту від: " + req.body.email  +  "Імя: " +  req.body.name + "Текст: " +  req.body.text  + "Тефон :" + req.body.phone
           
        };
         
         transporter.sendMail(mail, (error, info)=>{
           if (error) {
             console.log(error + " Лист не відправлено");
           } else {
             console.log('Лист відправлено: ' + info.response);
           }
         });
     }
     catch(e){
        errorHandler(res,e)
     }

}



