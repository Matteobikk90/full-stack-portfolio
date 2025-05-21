export const PrivacyPolicy = () => {
  return (
    <main className="flex flex-col gap-6 text-foreground max-w-3xl mx-auto py-12 px-4">
      <h1>Privacy Policy</h1>
      <p>
        This Privacy Policy explains how your personal data is collected, used,
        and protected when you submit a message through the contact form on this
        website.
      </p>

      <h2 className="text-xl font-semibold">1. What We Collect</h2>
      <p>
        When you submit the contact form, we collect the following information:
      </p>
      <ul className="list-disc list-inside">
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your message</li>
      </ul>

      <h2 className="text-xl font-semibold">2. Why We Collect It</h2>
      <p>
        This information is used solely to read and respond to your inquiry.
        Your data is not used for marketing or shared with any third parties.
      </p>

      <h2 className="text-xl font-semibold">3. How Your Data Is Stored</h2>
      <p>
        Your message is securely stored in a private database and also sent to
        my personal email address. No cookies, analytics, or tracking are tied
        to form submissions.
      </p>

      <h2 className="text-xl font-semibold">4. Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your data at
        any time by contacting me through the form.
      </p>

      <h2 className="text-xl font-semibold">5. Contact</h2>
      <p>
        If you have questions about this policy, please get in touch using the
        contact form on this website.
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
