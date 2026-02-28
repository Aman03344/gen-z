const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return false;
    }

    console.log("Email sent successfully:", data);
    return true; //  VERY IMPORTANT
  } catch (error) {
    console.error("Email sending failed:", error.message);
    return false;
  }
};

module.exports = sendVerificationEmail;
