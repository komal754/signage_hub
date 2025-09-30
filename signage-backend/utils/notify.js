const nodemailer = require('nodemailer');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const notifyAdmin = async (contact) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: ADMIN_EMAIL,
    subject: 'New Contact Submission',
    text: `New contact:\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nMessage: ${contact.message}`,
  });
};

const notifyCustomer = async (contact, template) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: contact.email,
    subject: 'Thank you for your inquiry',
    text: template,
  });
};

module.exports = { notifyAdmin, notifyCustomer };
