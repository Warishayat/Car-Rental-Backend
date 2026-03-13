const nodemailer = require("nodemailer");
const dotenv = require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const sendEmail = async (to, subject, text, attachment) => {

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: [
      {
        filename: "receipt.pdf",
        path: attachment
      }
    ]
  })
}

module.exports = sendEmail;