const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const emailTemplatePath = path.join(__dirname, 'emailTemplate.html');
const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Welcome to Our Service',
    html: emailTemplate
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
