const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const {
  MAIL_CLIENT_ID,
  MAIL_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = `${MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${SENDER_EMAIL_ADDRESS}`;

// send mail
const sendEmail = async (to, url, txt) => {
  const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    // const access_token = await oAuth2Client.getAccessToken();
    const access_token = await new Promise((resolve, reject) => {
      oAuth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });
    console.log(access_token)
    // edtwdmbhpzdhncvp

    let transport = nodemailer.createTransport({
      service: "gmail",
      secure: false, // true for 465, false for other ports
      auth: {
        user: SENDER_MAIL, // generated ethereal user
        pass: "dlwmthhdxuobtycq", // generated ethereal password
      },
    });
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

    const mailOptions = {
      from: SENDER_MAIL,
      to: to,
      subject: "DFD Ecommerce",
      html: `
              <div style="max-width: 700px; margin:auto; padding: 50px 20px;">
              <h2 style="text-align: center; text-transform: uppercase;color: #f4a51c;">Welcome to DFD Ecommerce</h2>
              <p>Congratulations! You're almost set to start using Dark Forest Designs Ecommerce.
                  Just click the button below to validate your email address.
              </p>
              
              <a href=${url} style="background: #f4a51c; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
          
              <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          
              <div>${url}</div>
              </div>
            `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;
