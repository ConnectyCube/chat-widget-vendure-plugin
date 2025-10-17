import { DefaultSearchPlugin, VendureConfig } from "@vendure/core";
import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import "dotenv/config";
import path from "path";
import { ChatWidgetPlugin } from "../src";
import { compileUiExtensions } from "@vendure/ui-devkit/compiler";

const apiPort = process.env.API_PORT || 3000;

export const config: VendureConfig = {
  apiOptions: {
    port: +apiPort,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
    shopApiPlayground: true,
    adminApiPlayground: true,
  },
  authOptions: {
    tokenMethod: ["bearer", "cookie"],
    superadminCredentials: {
      identifier: "superadmin",
      password: "superadmin",
    },
  },
  dbConnectionOptions: {
    type: "better-sqlite3",
    synchronize: true,
    migrations: [path.join(__dirname, "../migrations/*.+(js|ts)")],
    logging: false,
    database: path.join(__dirname, "vendure.sqlite"),
  },
  paymentOptions: {
    paymentMethodHandlers: [],
  },
  plugins: [
    DefaultSearchPlugin.init({}),
    ChatWidgetPlugin.init({
      appId: 8454,
      authKey: "59526294-1DAF-4A4C-A80F-5A3FB3250836",
      // storeName: "MyStore",
      // storeId: "59526294",
    }),
    AdminUiPlugin.init({
      port: 3002,
      route: "admin",
      adminUiConfig: {
        apiPort: +apiPort,
        apiHost: "http://localhost",
      },
      app: compileUiExtensions({
        devMode: true,
        extensions: [ChatWidgetPlugin.uiExtensions],
        outputPath: path.join(__dirname, "./admin-ui"),
      }),
    }),
  ],
};
