import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();
let transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service you prefer
    auth: {
        user: process.env.SMTP_USER, // Your email address
        pass: process.env.SMTP_PASS // Your email password or app password
    }
});

async function sendMail(mailOptions){
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
}

export default sendMail;