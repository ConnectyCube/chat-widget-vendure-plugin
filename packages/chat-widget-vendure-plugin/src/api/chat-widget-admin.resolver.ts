import { Query, Resolver } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { ChatWidgetOptions } from "../types";
import { PLUGIN_INIT_OPTIONS } from "../constants";

@Resolver()
export class ChatWidgetAdminResolver {
  constructor(
    @Inject(PLUGIN_INIT_OPTIONS) private options: ChatWidgetOptions,
  ) {}

  @Query()
  chatWidgetPluginConfig(): ChatWidgetOptions {
    return this.options;
  }
}
