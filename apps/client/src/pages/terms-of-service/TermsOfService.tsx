import { Link } from '@tanstack/react-router';

export const TermsOfService = () => {
  return (
    <main className="flex flex-col gap-6 text-foreground max-w-3xl mx-auto py-12 px-4">
      <h1>Terms of Service</h1>
      <p>
        By using the contact form on this website, you agree to the following
        terms and conditions.
      </p>

      <h2 className="text-xl font-semibold">1. Use of the Contact Form</h2>
      <p>
        This form is intended solely for legitimate inquiries, collaboration
        requests, or professional communication. Use of the form for spam,
        promotions, or abusive content is strictly prohibited.
      </p>

      <h2 className="text-xl font-semibold">2. Data Handling</h2>
      <p>
        By submitting the form, you consent to the collection and processing of
        your name, email address, and message for the purpose of communication.
        Your data will be stored securely and also forwarded to my personal
        email inbox.
      </p>
      <p>
        For more details, see our{' '}
        <Link to="/privacy-policy" className="underline text-blue-600">
          privacy policy
        </Link>
        .
      </p>

      <h2 className="text-xl font-semibold">3. Limitation of Use</h2>
      <p>
        I reserve the right to ignore, delete, or decline to respond to any
        message that is irrelevant, inappropriate, or outside the scope of this
        site's purpose.
      </p>

      <h2 className="text-xl font-semibold">4. Changes to These Terms</h2>
      <p>
        These terms may be updated at any time. The most recent version will
        always be available on this page.
      </p>

      <p className="text-sm">
        Effective Date:{' '}
        {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </main>
  );
};
