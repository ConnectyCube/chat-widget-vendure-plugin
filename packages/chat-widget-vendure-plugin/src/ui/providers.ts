import { addNavMenuSection } from "@vendure/admin-ui/core";

export default [
  addNavMenuSection(
    {
      id: "chat",
      label: "Chat",
      items: [
        {
          id: "chat",
          label: "Chat Widget",
          routerLink: ["/extensions/chat"],
        },
      ],
      requiresPermission: "ReadExample",
    },
    "sales",
  ),
];
