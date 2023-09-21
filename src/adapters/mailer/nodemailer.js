import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

export const mailer = {
  async send ({ to, subject, text }) {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      text
    })
  }
}
