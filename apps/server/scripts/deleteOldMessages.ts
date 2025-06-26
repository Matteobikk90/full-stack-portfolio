import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cutoff = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

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
}

main()
  .catch((e) => {
    console.error('❌ Error during cleanup:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
