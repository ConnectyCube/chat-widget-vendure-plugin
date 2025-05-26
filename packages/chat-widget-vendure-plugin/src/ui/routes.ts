import { registerRouteComponent } from "@vendure/admin-ui/core";
import { ChatComponent } from "./components/chat.component";

export default [
  registerRouteComponent({
    component: ChatComponent,
    path: "",
    title: "Chat",
    breadcrumb: "Chat",
  }),
];
