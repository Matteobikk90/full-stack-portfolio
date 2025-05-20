import type { FieldStateType } from '@/types/form.type';

export const asyncDebounceMs = 300;

export const getValidationClass = (state: FieldStateType) => {
  if (state.meta.errors?.[0]) return 'border-b-[2px] border-error';
  if (state.meta.isDirty) return 'border-b-[2px] border-success';
  return '';
};
