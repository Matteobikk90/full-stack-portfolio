'use strict';
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// apps/server/scripts/deleteOldMessages.ts
var deleteOldMessages_exports = {};
__export(deleteOldMessages_exports, {
  handler: () => handler,
});
module.exports = __toCommonJS(deleteOldMessages_exports);
var import_client = require('@prisma/client');
var prisma = new import_client.PrismaClient();
var handler = async () => {
  const cutoff = new Date(Date.now() - 10 * 24 * 60 * 60 * 1e3);
  try {
    const [deletedChats, deletedContacts] = await prisma.$transaction([
      prisma.chatMessage.deleteMany({
        where: { createdAt: { lt: cutoff } },
      }),
      prisma.contactMessage.deleteMany({
        where: { createdAt: { lt: cutoff } },
      }),
    ]);
    console.log(`\u2705 Deleted ${deletedContacts.count} old contact messages`);
    console.log(
      `[${/* @__PURE__ */ new Date().toISOString()}] \u2705 Deleted ${deletedChats.count} old chat messages`
    );
  } catch (e) {
    console.error('\u274C Error during cleanup:', e);
    throw e;
  } finally {
    await prisma.$disconnect();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    handler,
  });
