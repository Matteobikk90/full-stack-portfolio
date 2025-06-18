export const PrivacyPolicy = () => {
  return (
    <main className="flex flex-col gap-6 py-12 px-4">
      <h1>Privacy Policy</h1>
      <p>
        This Privacy Policy explains how your personal data is collected, used,
        and protected when you interact with this portfolio website.
      </p>

      <h2 className="text-xl font-semibold">1. What We Collect</h2>
      <p>We collect the following types of information:</p>
      <ul className="list-disc list-inside">
        <li>
          <strong>When submitting the contact form:</strong> your name, email,
          and message.
        </li>
        <li>
          <strong>
            When logging in via a provider (e.g., GitHub, Google):
          </strong>
          your email, display name, and profile picture.
        </li>
        <li>
          <strong>Optional chat or comment content</strong> you send while using
          the chat box or commenting on projects or experiences.
        </li>
      </ul>

      <h2 className="text-xl font-semibold">2. Why We Collect It</h2>
      <p>Your data is collected solely to:</p>
      <ul className="list-disc list-inside">
        <li>Respond to your contact messages</li>
        <li>
          Authenticate you as a real user (e.g., before you can comment or chat)
        </li>
        <li>Prevent spam and ensure respectful interactions</li>
      </ul>
      <p>
        Your data is <strong>not</strong> shared with third parties and is{' '}
        <strong>not</strong> used for marketing purposes.
      </p>

      <h2 className="text-xl font-semibold">3. How Your Data Is Stored</h2>
      <p>
        Contact messages are securely stored in a private database and also sent
        to my personal email address. Login data is used only to create or
        access your user identity on this site. No cookies or analytics are used
        to track your activity.
      </p>

      <h2 className="text-xl font-semibold">4. Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your data at
        any time by using the contact form.
      </p>

      <h2 className="text-xl font-semibold">5. Contact</h2>
      <p>
        For any questions about this Privacy Policy or your data, feel free to
        reach out using the contact form.
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
