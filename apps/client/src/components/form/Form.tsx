import { Button } from '@/lib/ui/button';
import { Input } from '@/lib/ui/input';
import { Textarea } from '@/lib/ui/textarea';
import { cn } from '@/lib/utils';
import {
  currentSchema,
  currentSchemaDefault,
} from '@/schemas/contact-form.schema';
import { asyncDebounceMs, getValidationClass } from '@/utils/form';
import { useForm } from '@tanstack/react-form';

export const ContactForm = () => {
  const form = useForm({
    defaultValues: currentSchemaDefault,
    validators: {
      onSubmit: currentSchema,
    },
    asyncDebounceMs,
    onSubmit: async ({ value }) => {
      const parsed = currentSchema.parse(value);
      console.log(parsed);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6 max-w-3xl m-auto"
    >
      <div className="flex gap-6">
        <form.Field
          name="name"
          validators={{
            onChange: currentSchema.shape.name,
          }}
        >
          {({ state, handleChange }) => (
            <Input
              placeholder="Your name"
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              className={cn(
                'border-0 border-b shadow-none rounded-none',
                getValidationClass(state)
              )}
            />
          )}
        </form.Field>
        <form.Field
          name="email"
          validators={{
            onChange: currentSchema.shape.email,
          }}
        >
          {({ state, handleChange }) => (
            <Input
              placeholder="Your email"
              type="email"
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              className={cn(
                'border-0 border-b shadow-none rounded-none',
                getValidationClass(state)
              )}
            />
          )}
        </form.Field>
      </div>

      <form.Field
        name="message"
        validators={{
          onChange: currentSchema.shape.message,
        }}
      >
        {({ state, handleChange }) => (
          <Textarea
            placeholder="Your message"
            value={state.value}
            onChange={(e) => handleChange(e.target.value)}
            className={cn(
              'border-0 border-b shadow-none rounded-none',
              getValidationClass(state)
            )}
          />
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.fieldMeta}>
        {(fieldMeta) => {
          const allTouched = Object.values(fieldMeta).every(
            (meta) => meta.isTouched
          );
          const allValid = Object.values(fieldMeta).every(
            (meta) => meta.isValid
          );

          const canSubmit = allTouched && allValid;

          return (
            <Button type="submit" disabled={!canSubmit}>
              Send message
            </Button>
          );
        }}
      </form.Subscribe>
    </form>
  );
};
