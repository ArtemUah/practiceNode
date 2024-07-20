import nodemailer from 'nodemailer';
import 'dotenv/config';


const {SMTP_UKRNET_HOST, SMTP_UKRNET_PORT, SMTP_UKRNET_USER, SMPT_UKRNET_PASSWORD, } = process.env;

const transporter = nodemailer.createTransport({
    host: SMTP_UKRNET_HOST,
    port: SMTP_UKRNET_PORT,
    secure: true,
    auth: {
        user: SMTP_UKRNET_USER,
        pass: SMPT_UKRNET_PASSWORD
    }
});

const sendEmail = async (options) => {
    return await transporter.sendMail(options);
};

export default sendEmail;
