import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { examplePermission, PLUGIN_INIT_OPTIONS } from "./constants";
import { ChatWidgetOptions } from "./types";
import { ui } from "./ui";
import { ChatWidgetService } from "./service/chat-widget.service";
import { ChatWidgetAdminResolver } from "./api/chat-widget-admin.resolver";
import { adminApiExtensionsTypes } from "./api/api-extensions";

/**
 * This is an example plugin that you can use as the basis for your own custom plugin.
 *
 * @category Plugin
 */
@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [
    {
      provide: PLUGIN_INIT_OPTIONS,
      useFactory: () => ChatWidgetPlugin.options,
    },
    ChatWidgetService,
  ],
  adminApiExtensions: {
    resolvers: [ChatWidgetAdminResolver],
    schema: adminApiExtensionsTypes,
  },
  configuration: (config) => {
    config.authOptions.customPermissions.push(examplePermission);
    return config;
  },
  compatibility: ">=3.0.0",
})
export class ChatWidgetPlugin {
  /** @internal */
  static options: ChatWidgetOptions;

  static uiExtensions = ui;

  /**
   * The static `init()` method is called with the options to
   * configure the plugin.
   *
   * @example
   * ```ts
   * ChatWidgetPlugin.init({
   *     ...,
   * }),
   * ```
   */
  static init(options: ChatWidgetOptions) {
    this.options = options;
    return ChatWidgetPlugin;
  }
}
