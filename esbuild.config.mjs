import { build } from "esbuild";

await build({
  entryPoints: ["./apps/server/scripts/deleteOldMessages.ts"],
  bundle: true,
  platform: "node",
  target: "node18",
  outfile: "./apps/server/lambda/index.js",
  external: ["@prisma/client"],
});
