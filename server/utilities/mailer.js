const nodemailer = require('nodemailer');
// keep credentials safe
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // ✅ TLS port (preferred)
  secure: false, // ✅ false for TLS
  auth: {
    user: process.env.EMAIL_NAME, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});

// verify the connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Nodemailer error:', error);
  } else {
    console.log('Nodemailer is ready to send emails ✅');
  }
});

// export a function to send email
const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: `"Votera" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
