import { Link } from '@tanstack/react-router';

export const DeleteData = () => (
  <main className="flex flex-col gap-6 py-8 px-4">
    <h1>Facebook Data Deletion Instructions</h1>
    <p>
      If you signed in using Facebook and would like to request deletion of your
      data from our system, please send an email to{' '}
      <a
        className="underline text-blue-600"
        href="mailto:matteo.soresini@hotmail.it?subject=Facebook Data Deletion Request"
      >
        matteo.soresini@hotmail.it
      </a>{' '}
      with the subject <strong>“Facebook Data Deletion Request”</strong>.
    </p>
    <p>
      Alternatively, you can use the{' '}
      <Link to="/contact" className="underline text-blue-600">
        contact form
      </Link>{' '}
      on our website. We will process your request and remove all associated
      data from our records.
    </p>
  </main>
);
