import nodemailer from "nodemailer";
import dotenv from "dotenv";
import email from "./templates/email_template";

dotenv.config();

interface Option {
  to: string;
  subject: string;
  message: string;
}

export default function mailer(option: Option): void {
  const html: string = email(option.subject, option.message);
  const transporter: any = nodemailer.createTransport({
    host: process.env.EMAIL_USER,
    port: process.env.EMAIL_PORT,
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_USER_PASSWORD,
    },
  } as any);
  const mailOptions: any = {
    from: process.env.EMAIL_USER,
    to: option.to,
    subject: option.subject,
    html: html,
  };
  try {
    const result = transporter.sendMail(mailOptions);
    transporter.close();
    return result;
  } catch (error) {
    console.error(error);
  }
}
