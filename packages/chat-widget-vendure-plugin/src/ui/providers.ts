import { addNavMenuSection } from "@vendure/admin-ui/core";

export default [
  addNavMenuSection(
    {
      id: "chat",
      label: "Chat",
      items: [
        {
          id: "chat",
          label: "Chat",
          routerLink: ["/extensions/chat"],
          icon: "chat-bubble",
        },
      ],
      requiresPermission: "ReadExample",
    },
    "sales",
  ),
];
