require("dotenv").config();
const nodeMailer = require("nodemailer");

const getTransport = () =>
  nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

const getMailOptions = (email, link) => {
  let body = `
    <h2>Hey ${email}</h2>
    <p>Here's the special magic link you requested:</p>
    <p>${link}</p>
    <p>Please note that for added security this link becomes invalid after 45 minutes</p>
    <p>Stay Jiggy</p>`;

  return {
    body,
    subject: "CitruMilk: Your Order Details",
    to: email,
    html: body,
    from: process.env.EMAIL_ADDRESS,
  };
};

module.exports = { getMailOptions, getTransport}