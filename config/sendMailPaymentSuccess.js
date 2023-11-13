const nodemailer = require('nodemailer')
const { OAuth2Client } = require('google-auth-library')

const {
  MAIL_CLIENT_ID,
  MAIL_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const CLIENT_ID = `${MAIL_CLIENT_ID}`
const CLIENT_SECRET = `${MAIL_CLIENT_SECRET}`
const REFRESH_TOKEN = `${MAIL_REFRESH_TOKEN}`
const SENDER_MAIL = `${SENDER_EMAIL_ADDRESS}`

// send mail
const sendMailPaymentSuccess = async (to, txt) => {
  // const oAuth2Client = new OAuth2Client(
  //   CLIENT_ID,
  //   CLIENT_SECRET,
  //   OAUTH_PLAYGROUND,
  // )

  // oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

  try {
    // const access_token = await oAuth2Client.getAccessToken()

    // const transport = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     type: "OAuth2",
    //     user: SENDER_MAIL,
    //     clientId: CLIENT_ID,
    //     clientSecret: CLIENT_SECRET,
    //     refreshToken: REFRESH_TOKEN,
    //     access_token,
    //   },
    // });
    let transport = nodemailer.createTransport({
      service: 'gmail',
      secure: false, // true for 465, false for other ports
      auth: {
        user: SENDER_MAIL, // generated ethereal user
        pass: 'dlwmthhdxuobtycq', // generated ethereal password
      },
    })
    const mailOptions = {
      from: SENDER_MAIL,
      to: to,
      subject: 'Dark Forest Designs - Ecommerce',
      html: `
              <div style="max-width: 700px; margin:auto; padding: 50px 20px;">
              <p>Congratulations! your payment is Successfully placed. You will get your product shorly.
              </p>
              </div>
            `,
    }

    const result = await transport.sendMail(mailOptions)
    return result
  } catch (err) {
    console.log(err)
  }
}

module.exports = sendMailPaymentSuccess
