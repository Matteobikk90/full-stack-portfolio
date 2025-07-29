import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handler = async () => {
  const cutoff = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

  try {
    const [deletedChats, deletedContacts] = await prisma.$transaction([
      prisma.chatMessage.deleteMany({
        where: { createdAt: { lt: cutoff } },
      }),
      prisma.contactMessage.deleteMany({
        where: { createdAt: { lt: cutoff } },
      }),
    ]);

    console.log(`✅ Deleted ${deletedContacts.count} old contact messages`);
    console.log(
      `[${new Date().toISOString()}] ✅ Deleted ${deletedChats.count} old chat messages`
    );
  } catch (e) {
    console.error('❌ Error during cleanup:', e);
    throw e;
  } finally {
    await prisma.$disconnect();
  }
};
