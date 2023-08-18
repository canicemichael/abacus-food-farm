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
    <p>Here's the list of products you ordered:</p>
    <p>${link}</p>
    <p></p>
    <p></p>`;

  return {
    body,
    subject: "CitruMilk: Your Order Details",
    to: email,
    html: body,
    from: process.env.EMAIL_ADDRESS,
  };
};

module.exports = { getMailOptions, getTransport}