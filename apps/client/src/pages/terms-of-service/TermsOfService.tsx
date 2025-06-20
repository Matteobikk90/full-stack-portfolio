import { ScrollContainer } from '@/components/scroll-container';
import { Link } from '@tanstack/react-router';

export const TermsOfService = () => (
  <main className="flex flex-col gap-6 py-8 px-4">
    <h1>Terms of Service</h1>
    <p>
      By using the contact form on this website, you agree to the following
      terms and conditions.
    </p>
    <section className="flex flex-col flex-1 min-h-0">
      <ScrollContainer className="flex-1 min-h-0">
        <article className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">1. Use of the Contact Form</h2>
          <p>
            This form and login system are intended solely for legitimate
            inquiries, collaboration requests, or professional communication.
            Use of the form or login feature for spam, impersonation, or
            disruptive behavior is strictly prohibited and may result in access
            revocation.
          </p>
          <h2 className="text-xl font-semibold">2. Data Handling</h2>
          <p>
            By submitting the form, you consent to the collection and processing
            of your name, email address, and message for the purpose of
            communication. Your data will be stored securely and also forwarded
            to my personal email inbox.
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
            message that is irrelevant, inappropriate, or outside the scope of
            this site's purpose.
          </p>
          <h2 className="text-xl font-semibold">4. Changes to These Terms</h2>
          <p>
            These terms may be updated at any time. The most recent version will
            always be available on this page.
          </p>
          <h2 className="text-xl font-semibold">
            5. Facebook Login and Data Removal
          </h2>
          <p>
            Users who sign in using Facebook may request removal of their data
            by visiting the{' '}
            <Link to="/delete-data" className="underline text-blue-600">
              Data Deletion page
            </Link>
            .
          </p>
          <p className="text-sm">
            Effective Date:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>{' '}
        </article>
      </ScrollContainer>
    </section>
  </main>
);
