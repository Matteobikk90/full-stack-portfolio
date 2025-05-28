import { mockExperiences } from '@/utils/mockedData';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/user', () => HttpResponse.json({ name: 'Matteo' })),

  http.get('/api/experiences', () => {
    return HttpResponse.json(mockExperiences);
  }),
];
