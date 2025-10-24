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
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: 'New Contact Submission',
      text: `New contact:\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nMessage: ${contact.message}`,
    });
    console.log('Admin notification email sent successfully');
  } catch (err) {
    console.error('Error sending admin notification email:', err);
    throw err;
  }
};

const notifyCustomer = async (contact, template) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: contact.email,
      subject: 'Thank you for your inquiry',
      text: template,
    });
    console.log('Customer notification email sent successfully');
  } catch (err) {
    console.error('Error sending customer notification email:', err);
    throw err;
  }
};

module.exports = { notifyAdmin, notifyCustomer };
