import { axiosPost } from '@/utils/api';

export const sendAIMessage = async (message: string): Promise<string> => {
  const res = await axiosPost<{ reply: string }, { message: string }>(
    '/api/ai-chat',
    { message }
  );
  return res?.reply ?? 'Sorry, something went wrong.';
};
