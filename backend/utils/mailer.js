const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: "admin@gmail.com",
    pass: "your-app-password"
  }

});

const sendMail = async (to, subject, text) => {

  await transporter.sendMail({

    from: "Placement Portal",
    to,
    subject,
    text

  });

};

module.exports = sendMail;