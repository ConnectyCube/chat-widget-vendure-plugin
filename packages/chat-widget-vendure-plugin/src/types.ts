/**
 * These are the configuration options for the plugin.
 *
 * @category Plugin
 */
export interface ChatWidgetOptions {
  /**
   * This is a dummy option used to illustrate how options can be set by the plugin
   * consumer, by calling `ChatWidgetPlugin.init({ enabled: true })`, and then
   * the option can be used inside your services, resolvers etc.
   */
  enabled: boolean;
}
