const nodemailer = require('nodemailer');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

const notifyAdmin = async (contact) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // verified sender
      to: ADMIN_EMAIL,
      subject: 'New Contact Submission',
      text: `New contact:\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nMessage: ${contact.message}`,
    });
      // console.log('Admin notification email sent successfully');
  } catch (err) {
    console.error('Error sending admin notification email:', err);
    throw err;
  }
};

const notifyCustomer = async (contact, template) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // verified sender
      to: contact.email,
      subject: 'Thank you for your inquiry',
      text: template,
    });
      // console.log('Customer notification email sent successfully:', info.response);
  } catch (err) {
    console.error('Error sending customer notification email:', {
      message: err.message,
      stack: err.stack,
      response: err.response,
      code: err.code,
      ...err
    });
    throw err;
  }
  // Log customer email status for local testing
  // console.log('Customer email status:', customerEmailStatus, customerEmailError);
};

module.exports = { notifyAdmin, notifyCustomer };
