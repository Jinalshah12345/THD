
const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "35e73934c5fbbe",
      pass: "4d7c3f23e30846"
    }
  });


  message = {
    from: "sjinal610@gmail.com",
    to: "jshah@miraclesoft.com",
    subject: "Subject",
    text: "Hello SMTP Email"
}

transporter.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }

