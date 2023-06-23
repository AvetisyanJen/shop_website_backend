const nodemailer = require("nodemailer");
require('dotenv').config();

const USER_SENDER= process.env.USER_SENDER
const PASSWORD=  process.env.PASSWORD



function sendMail(mail,link){

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:USER_SENDER,
          pass:PASSWORD
        },
        tls:{rejectUnauthorized:true}

      });
  
      const mailOptions = {
        from:PASSWORD,
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
