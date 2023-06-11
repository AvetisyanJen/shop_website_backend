const nodemailer = require("nodemailer");
require('dotenv').config();
const username=process.env.USERNAME
const password= process.env.PASSWORD
function sendMail(mail,link){

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:username,
          pass:password
        }
      });
    
      const mailOptions = {
        from:password,
        to: mail,
      
        // text: `Click  ${link}`
        subject: "hi",
        html: `${link}`,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports=sendMail
