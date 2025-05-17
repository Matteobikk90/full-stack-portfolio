import type { FieldState } from '@tanstack/react-form';

export const asyncDebounceMs = 300;

export const getValidationClass = <T extends FieldState>(state: T): string => {
  if (state.meta.errors?.[0]) return 'border-[3px] border-error';
  if (state.meta.isDirty) return 'border-[3px] border-success';
  return '';
};
