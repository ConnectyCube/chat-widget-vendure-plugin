import { registerReactRouteComponent } from "@vendure/admin-ui/react";
import { Chat } from "./components/Chat";

export default [
  registerReactRouteComponent({
    component: Chat,
    path: "",
    title: "Chat",
    breadcrumb: "Chat",
  }),
];
