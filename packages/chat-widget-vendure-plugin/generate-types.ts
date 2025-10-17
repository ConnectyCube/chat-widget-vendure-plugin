import { generateTypes } from "../../utils/generate-types";
import path from "path";
import { ChatWidgetPlugin } from "./src";

require("dotenv").config({ path: path.join(__dirname, "../dev-server/.env") });

generateTypes(
  {
    plugins: [
      ChatWidgetPlugin.init({
        appId: 1,
        authKey: "your-auth-key"
      }),
    ],
  },
  {
    pluginDir: __dirname,
    e2e: true,
    ui: false,
  },
).then(() => process.exit(0));
