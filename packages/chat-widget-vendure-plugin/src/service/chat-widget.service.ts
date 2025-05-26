import { Inject, Injectable } from "@nestjs/common";
import { PLUGIN_INIT_OPTIONS } from "../constants";
import { ChatWidgetOptions } from "../types";

@Injectable()
export class ChatWidgetService {
  constructor(
    @Inject(PLUGIN_INIT_OPTIONS) private options: ChatWidgetOptions,
  ) {}
}
