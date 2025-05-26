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
  yarn add @connectycube/chat-widget-vendure-plugin
  ```

2.  Create ConnectyCube account [https://connectycube.com/signup](https://connectycube.com/signup/) and application, obtain credentials

<img width="800" alt="Screenshot 2025-05-07 at 15 19 59" src="https://github.com/user-attachments/assets/77995af3-eb65-4559-8939-e3cc36104862" />


3. Add the following variables to your `.env` file:

    ```
    CONNECTYCUBE_APP_ID=<YOUR CONNECTYCUBE APP ID>
    CONNECTYCUBE_AUTH_KEY=<YOUR CONNECTYCUBE AUTH KEY>
    ```

    - `CONNECTYCUBE_APP_ID` - This is essential for authenticating your application with the ConnectyCube platform and accessing its chat services.
    - `CONNECTYCUBE_AUTH_KEY` - This key is used to authorize your application and ensure secure communication with the ConnectyCube SDK.

4.  Add the following code to your `vendure-config.ts` file:

    ```typescript
      import { ChatWidgetPlugin } from '@connectycube/chat-widget-vendure-plugin';

      plugins: [
        ChatWidgetPlugin.init({
           appId: ...,
           authKey: ""
        }),
      ];
    ```

### Storefront

TBA

## Development

```
npm run dev
```

Open the Admin UI at http://localhost:3000/admin in your browser and log in with the superadmin credentials which default to:

```
username: superadmin
password: superadmin
```

### Publish

https://docs.vendure.io/guides/how-to/publish-plugin/

## Have an issue?

Join our [Discord](https://discord.com/invite/zqbBWNCCFJ) for quick answers to your questions or [file a GitHub issue](https://github.com/ConnectyCube/chat-widget-vendure-plugin/issues) 

## Community

- [Blog](https://connectycube.com/blog)
- X (twitter)[@ConnectyCube](https://x.com/ConnectyCube)
- [Facebook](https://www.facebook.com/ConnectyCube)

## License

Apache 2.0