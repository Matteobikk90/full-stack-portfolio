import { mockExperiences } from '@/utils/mockedData';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/user', () => HttpResponse.json({ name: 'Matteo' })),

  http.get('/api/experiences', () => {
    return HttpResponse.json(mockExperiences);
  }),

  http.all('*', ({ request }) => {
    console.warn('[MSW] Unhandled request to', request.url);
    return new HttpResponse(null, { status: 500 });
  }),
];
