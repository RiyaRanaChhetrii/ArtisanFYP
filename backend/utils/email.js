// utils/email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kyler.mcclure@ethereal.email',
        pass: 'N41m5DPGdejfkD45jd'
    }
});

export const sendPasswordResetEmail = async (email, id) => {
    const mailOptions = {
        from: 'biranachhetri@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        html: `<p>Click <a href="http://localhost:3000/reset-password?id=${id}">here</a> to reset your password.</p>`
    };

    await transporter.sendMail(mailOptions);
};
