const defaultDateFormatting = (date: string) =>
  new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
  });

export const formatDateRange = (start: string, end: string) => {
  const from = defaultDateFormatting(start);
  const to = end ? defaultDateFormatting(end) : 'Present';
  return `${from} - ${to}`;
};
