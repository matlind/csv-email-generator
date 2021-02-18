require('dotenv').config()
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function mailOptionsFactory(fileName) {
  return {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_RECIPIENT,
    subject: "test mail",
    html: "<h1>This is a test mail.</h1>",
    attachments: [
      {
        filename: "text4.txt",
        content: fs.createReadStream(fileName),
      },
    ],
  };
}

function sendMail(fileName) {
  transporter.sendMail(mailOptionsFactory(fileName), function (err, info) {
    if (err) console.log(err);
    else console.log("Emal sent: " + info.response);
  });
}

module.exports.sendMail = sendMail;
