import { experienceYears } from '@/utils/constants';

export const aboutInfo = [
  { label: 'Name', value: 'Matteo Soresini' },
  { label: 'Phone', value: '(+39) 347 043 8232' },
  { label: 'Email', value: 'matteo.soresini@hotmail.it' },
  {
    label: 'Experience',
    i18nKey: 'Experience',
    args: { years: experienceYears },
  },
  { label: 'GitHub', value: '/Matteobikk90' },
  { label: 'LinkedIn', value: '/in/matteosoresini90/' },
  { label: 'Nationality', i18nKey: 'Nationality' },
  { label: 'Languages', i18nKey: 'Languages' },
];
