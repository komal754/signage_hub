const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const notifyAdmin = async (contact) => {
  // Email sending disabled: skipping SendGrid to avoid charges
  // Uncomment below to enable email notifications
  /*
  try {
    await sgMail.send({
      to: ADMIN_EMAIL,
      from: process.env.EMAIL_USER, // must be verified in SendGrid
      subject: 'New Contact Submission',
      text: `New contact:\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nMessage: ${contact.message}`,
    });
    console.log('✅ Admin email sent');
  } catch (err) {
    console.error('❌ Admin email failed:', err.response?.body || err.message);
  }
  */
};

const notifyCustomer = async (contact, template) => {
  // Email sending disabled: skipping SendGrid to avoid charges
  // Uncomment below to enable email notifications
  /*
  try {
    await sgMail.send({
      to: contact.email,
      from: process.env.EMAIL_USER,
      subject: 'Thank you for your inquiry',
      text: template,
    });
    console.log('✅ Customer email sent');
  } catch (err) {
    console.error('❌ Customer email failed:', err.response?.body || err.message);
  }
  */
};

module.exports = { notifyAdmin, notifyCustomer };
