export type FieldStateType = {
  meta: {
    errors?: ({ message?: string } | undefined)[];
    isDirty: boolean;
  };
};
