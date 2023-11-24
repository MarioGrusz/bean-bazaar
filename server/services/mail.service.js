import nodemailer from 'nodemailer';
import loadEnv from '../utils/loadEnv.js';

loadEnv('../env')

const emailAddress = process.env.EMAIL;
const password = process.env.EMAIL_PASS;


const transponter = nodemailer.createTransport({
    host: 'smtp.poczta.onet.pl',
    port: 465,
    secure: true,
    auth: {
        user: emailAddress,
        pass: password,
    }
});


const getEmailFromUser = async (name, email, message) => {

    try{

        const mailOptions = {
            from: emailAddress,
            to: emailAddress,
            subject: `Message from ${name}, ${email}`,
            text: message,
        };

        await transponter.sendMail(mailOptions);
        console.log('You have new email from:', name);

    }

    catch(error){
        console.log(error)
    }
}

export default getEmailFromUser