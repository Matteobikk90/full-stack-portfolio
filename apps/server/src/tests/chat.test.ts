import { notifyEmail } from '@/utils/chat';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const sendMail = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));

vi.mock('@/config/mailer', () => ({
  transporter: { sendMail },
}));

const message = {
  id: 'message-id',
  content: 'Hello',
  createdAt: new Date(),
  senderId: 'sender-id',
  receiverId: 'receiver-id',
  sender: { email: 'visitor@example.com' },
  receiver: { email: 'recipient@example.com' },
};

describe('chat email notifications', () => {
  const originalContactEmail = process.env.CONTACT_EMAIL;

  beforeEach(() => {
    process.env.CONTACT_EMAIL = 'portfolio@example.com';
  });

  afterEach(() => {
    sendMail.mockClear();
    if (originalContactEmail === undefined) {
      delete process.env.CONTACT_EMAIL;
    } else {
      process.env.CONTACT_EMAIL = originalContactEmail;
    }
  });

  it('notifies the configured portfolio address for a visitor message', () => {
    notifyEmail(false, message);

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'portfolio@example.com' })
    );
  });

  it('notifies the visitor when the admin replies', () => {
    notifyEmail(true, message);

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'recipient@example.com' })
    );
  });
});
