import { Button } from '@/lib/ui/button';
import { Input } from '@/lib/ui/input';
import { Label } from '@/lib/ui/label';
import { Textarea } from '@/lib/ui/textarea';
import { cn } from '@/lib/utils';
import {
  currentSchema,
  currentSchemaDefault,
} from '@/schemas/contact-form.schema';
import { toastDuration } from '@/utils/constants';
import { asyncDebounceMs, getValidationClass } from '@/utils/form';
import { SpinnerIcon } from '@phosphor-icons/react';
import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: currentSchemaDefault,
    validators: {
      onSubmit: currentSchema,
    },
    asyncDebounceMs,
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      const { name, email, message } = value;

      try {
        const res = await axios.post('/api/contact', {
          name,
          email,
          message,
        });

        form.reset();
        toast.success(res.data.message, {
          description: 'I’ll get back to you soon.',
          duration: toastDuration,
        });
      } catch (error: unknown) {
        const axiosError = error as AxiosError<{ message?: string }>;

        toast.error(axiosError.response?.data?.message, {
          description: 'If the issue persists, contact me directly.',
          duration: toastDuration,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-6">
        <form.Field
          name="name"
          validators={{
            onChange: currentSchema.shape.name,
          }}
        >
          {({ state, handleChange }) => (
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                className={cn(
                  'border-0 border-b shadow-none rounded-none',
                  getValidationClass(state)
                )}
              />
              {state.meta.errors?.[0] && (
                <p className="text-xs text-error">
                  {state.meta.errors?.[0].message || ''}
                </p>
              )}
            </div>
          )}
        </form.Field>
        <form.Field
          name="email"
          validators={{
            onChange: currentSchema.shape.email,
          }}
        >
          {({ state, handleChange }) => (
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Your email"
                type="email"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                className={cn(
                  'border-0 border-b shadow-none rounded-none',
                  getValidationClass(state)
                )}
              />
              {state.meta.errors?.[0] && (
                <p className="text-xs text-error">
                  {state.meta.errors?.[0].message || ''}
                </p>
              )}
            </div>
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
          <div className="flex flex-col gap-1">
            <Label htmlFor="Message">Message</Label>
            <Textarea
              id="Message"
              placeholder="Your message"
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              className={cn(
                'border-0 border-b shadow-none rounded-none',
                getValidationClass(state)
              )}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="acceptedTerms">
        {({ state, handleChange }) => (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Input
                id="acceptedTerms"
                type="checkbox"
                checked={state.value}
                onChange={(e) => handleChange(e.target.checked)}
                className="h-3"
              />
              <Label htmlFor="acceptedTerms">
                I agree to the
                <Link to="/privacy-policy" className="underline">
                  privacy policy
                </Link>
                and
                <Link to="/terms-of-service" className="underline">
                  terms of service
                </Link>
              </Label>
            </div>
            {state.meta.errors?.[0] && (
              <p className="text-xs text-error">
                {state.meta.errors?.[0].message || ''}
              </p>
            )}
          </div>
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
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">
                    <SpinnerIcon size={32} weight="duotone" />
                  </span>
                  Sending...
                </span>
              ) : (
                'Send message'
              )}
            </Button>
          );
        }}
      </form.Subscribe>
    </form>
  );
};
