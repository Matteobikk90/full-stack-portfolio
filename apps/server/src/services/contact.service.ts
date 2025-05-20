import { transporter } from '@/config/mailer';

export const sendContactEmail = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  await transporter.sendMail({
    from: `<${email}>`,
    to: process.env.CONTACT_EMAIL,
    subject: `Matteo Soresini Portfolio - New Message from ${name}`,
    text: message,
  });
};
