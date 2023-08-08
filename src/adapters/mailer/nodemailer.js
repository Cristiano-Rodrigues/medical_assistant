import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

export const mailer = {
  async send ({ type, to, content }) {
    const { text, subject } = messages[type](content)
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      text
    })
  }
}

const messages = {
  'activation-code': (content) => ({
    text: `Your activation code is ${content}`,
    subject: 'Activation code'
  })
}