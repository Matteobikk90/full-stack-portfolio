import Form from '@/components/form';
import { ScrollContainer } from '@/components/scroll-container';

export const Contact = () => (
  <main className="flex flex-col">
    <section className="flex flex-col flex-1 min-h-0 max-w-3xl mx-auto space-y-8">
      <h1 className="text-contact">Contact</h1>
      <p>
        I’d love to hear from you! Whether you have a question, want to
        collaborate, or just want to say hi — fill out the form below and I’ll
        get back to you shortly.
      </p>
      <ScrollContainer className="flex-1 min-h-0 pr-4">
        <Form />
      </ScrollContainer>
    </section>
  </main>
);
