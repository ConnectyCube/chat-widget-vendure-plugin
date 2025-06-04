# Vendure chat widget plugin

Vendure plugin to integrate Chat Widget for seller/buyer communication

## Features

- **Easy Integration**
  - Simple script to copy-paste on your website, no coding required
  - No need to handle backend infrastructure — ConnectyCube takes care of it
- **Superior feature set**
  - Not just another basic chat widget - it's a complete chat system!
- **Customizable UI**
  - Modify colors, themes, and layout to match your brand’s design
- **Real-time Messaging**
  - Smooth, instant communication with no delays
- **Moderation tools**
  - Keep chats safe with message filtering, user bans, and admin controls
- **Multimedia support**
  - Send images, files, and emojis for richer conversations

## Installation

### Backend

1. Add plugin to your Vendure app:

  ```
  yarn add @connectycube/vendure-plugin-chat-widget
  ```

2.  Create ConnectyCube account [https://connectycube.com/signup](https://connectycube.com/signup/) and application, obtain credentials

<img width="800" alt="Screenshot 2025-05-07 at 15 19 59" src="https://github.com/user-attachments/assets/77995af3-eb65-4559-8939-e3cc36104862" />

3.  Add the following code to your `vendure-config.ts` file:

    ```typescript
      import { ChatWidgetPlugin } from '@connectycube/vendure-plugin-chat-widget';

      plugins: [
        ChatWidgetPlugin.init({
           appId: ..., // ConnectyCube App Id
           authKey: "", // ConnectyCube Auth Key
           storeName: "", // A name of your store (any string, will be visible by buyer)
           storeId: "" // Some uniq identifier of your store (any uniq string)
        }),
      ];
    ```

### Storefront

TBA

## How can I use it?

On storefront, once logged in and opened product page, there will be a Chat toggle button bottom right.

From Vendure dashboard there will be a new page called Chat, with the widget embedded, where all customers' chats are displayed, so you as a merchant can reply:

<img width="1509" alt="Screenshot 2025-05-07 at 16 38 13" src="https://github.com/user-attachments/assets/13cefe90-216b-46bb-94b3-ac754df4de74" />


## Have an issue?

Join our [Discord](https://discord.com/invite/zqbBWNCCFJ) for quick answers to your questions or [file a GitHub issue](https://github.com/ConnectyCube/chat-widget-vendure-plugin/issues) 

## Community

- [Blog](https://connectycube.com/blog)
- X (twitter)[@ConnectyCube](https://x.com/ConnectyCube)
- [Facebook](https://www.facebook.com/ConnectyCube)

## License

Apache 2.0