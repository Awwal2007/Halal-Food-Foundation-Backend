const dotenv = require("dotenv")
const transporter = require('./transporter');

const sendVerificationEmail = (email, userFirstName, token)=>{
    const options = {
        to: email,
        subject: "🚀 Welcome to EatEasy! Let's Verify Your Account!",
        from: "EatEasy",
        replyTo: "eateasy@gmail.com",
        html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; padding: 20px;">
        <p style="margin-bottom: 16px;">Hi ${userFirstName},</p>
      
        <p style="margin-bottom: 16px;">
          Thanks for signing up for <strong>EatEasy</strong> — we're thrilled to have you on board!
        </p>
      
        <p style="margin-bottom: 16px;">
          Before you can start enjoying everything we have to offer, please verify your email address by clicking the button below:
        </p>
      
        <p style="margin: 20px 0;">
          <a href="${process.env.client_domain}/verify/${token}"
             style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
             Verify my Email
          </a>
        </p>
      
        <p style="margin-bottom: 16px;">
          This helps us keep your account secure and ensures you don’t miss any important updates.
        </p>
      
        <p style="margin-bottom: 16px;">
          Welcome again,
        </p>
      
        <p style="font-weight: bold;">The EatEasy Team</p>
      </div>
        `
    }
    transporter.sendMail(options, (err, info)=>{
        if(err){
            console.log(err.message)
        }else{
            console.log("Email sent successfully")
            // console.log(info)
        }
    })
}

module.exports = sendVerificationEmail
