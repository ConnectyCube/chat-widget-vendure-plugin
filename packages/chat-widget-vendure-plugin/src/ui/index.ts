import { AdminUiExtension } from "@vendure/ui-devkit/compiler";
import path from "path";
import fs from "fs";

let extensionPath: string;
try {
  const devModeExtensionPath = path.join(
    process.cwd(),
    "packages/chat-widget-vendure-plugin/src/ui",
  );
  fs.accessSync(devModeExtensionPath);
  extensionPath = devModeExtensionPath;
} catch (e: any) {
  extensionPath = __dirname;
}

export const ui: AdminUiExtension = {
  extensionPath,
  id: "chat-widget-vendure-plugin",
  providers: ["providers.ts"],
  routes: [
    {
      route: "chat",
      filePath: "routes.ts",
    },
  ],
};
