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
    from: `"${name}" <${email}>`,
    to: process.env.CONTACT_EMAIL,
    subject: 'Portfolio - New Message',
    text: message,
  });
};
