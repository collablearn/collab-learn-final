import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


const user = process.env.GMAIL_EMAIL;
const pass = process.env.GMAIL_PWS;

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user,
        pass,
    }
})

transporter.verify((error, message) => {
    if (error) {
        console.log(error);
    } else {
        console.log("The mailer is set and ready to fire!");
    }
})

export default transporter;
