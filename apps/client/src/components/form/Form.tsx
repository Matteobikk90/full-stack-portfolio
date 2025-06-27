import { useUISound } from '@/hooks/useUISound';
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
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const ContactForm = () => {
  const { t } = useTranslation();
  const { play } = useUISound();
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
        await axios.post('/api/contact', {
          name,
          email,
          message,
        });

        form.reset();
        toast.success(t('contact.success.title'), {
          description: t('contact.success.description'),
          duration: toastDuration,
        });
      } catch {
        toast.error(t('contact.error.title'), {
          description: t('contact.error.description'),
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
      className="space-y-6 p-0.5"
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
              <Label htmlFor="name">{t('contact.name.label')}</Label>
              <Input
                id="name"
                placeholder={t('contact.name.placeholder')}
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
              <Label htmlFor="email">{t('contact.email.label')}</Label>
              <Input
                id="email"
                placeholder={t('contact.email.placeholder')}
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
            <Label htmlFor="message">{t('contact.message.label')}</Label>
            <Textarea
              id="message"
              placeholder={t('contact.message.placeholder')}
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
            <label className="flex items-start gap-2">
              <Input
                id="acceptedTerms"
                type="checkbox"
                checked={state.value}
                onChange={(e) => {
                  handleChange(e.target.checked);
                  play(e.target.checked ? 'checkOn' : 'checkOff');
                }}
                className="mt-1 h-4 shrink-0"
              />

              <span className="text-sm leading-relaxed flex flex-wrap">
                {t('contact.privacy.one')}&nbsp;
                <Link to="/privacy-policy" className="underline text-blue-500">
                  {t('contact.privacy.two')}
                </Link>
                &nbsp;{t('contact.privacy.three')}&nbsp;
                <Link
                  to="/terms-of-service"
                  className="underline text-blue-500"
                >
                  {t('contact.privacy.four')}
                </Link>
              </span>
            </label>

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
                    <SpinnerIcon className="size-5" weight="duotone" />
                  </span>
                  {t('contact.sending')}
                </span>
              ) : (
                t('contact.send')
              )}
            </Button>
          );
        }}
      </form.Subscribe>
    </form>
  );
};
