import Form from '@/components/form';

export const Contact = () => {
  return (
    <main className="z-11 relative">
      <section className="max-w-3xl m-auto space-y-12 animate-fade-up">
        <h1 className="text-contact">Contact</h1>
        <p>
          I’d love to hear from you! Whether you have a question, want to
          collaborate, or just want to say hi — fill out the form below and I’ll
          get back to you shortly.
        </p>
        <Form />
      </section>
    </main>
  );
};
