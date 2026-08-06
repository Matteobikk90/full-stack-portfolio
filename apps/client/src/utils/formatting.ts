const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const formatMonth = (date: Date, locale: string) =>
  capitalize(
    date.toLocaleDateString(locale, {
      month: 'short',
      timeZone: 'UTC',
    })
  );

export const formatDateRange = (
  start: string,
  end?: string | null,
  locale = 'en'
) => {
  const from = new Date(start);
  const fromYear = from.getUTCFullYear();

  if (!end) {
    const present = locale.startsWith('it') ? 'Presente' : 'Present';
    return `${fromYear} - ${present}`;
  }

  const to = new Date(end);
  const toYear = to.getUTCFullYear();

  if (fromYear !== toYear) return `${fromYear} - ${toYear}`;

  const fromMonth = formatMonth(from, locale);
  const toMonth = formatMonth(to, locale);

  return fromMonth === toMonth
    ? `${fromMonth} ${fromYear}`
    : `${fromMonth} - ${toMonth} ${fromYear}`;
};
