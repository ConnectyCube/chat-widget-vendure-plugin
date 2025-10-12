# Vendure chat widget plugin

Vendure plugin to integrate Chat Widget for seller/buyer communication

<img width="1502" alt="Screenshot 2025-07-02 at 12 14 00" src="https://github.com/user-attachments/assets/d27d7761-0aff-4291-bc34-f27d4eedcb95" />

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

2.  Create ConnectyCube account [https://connectycube.com/signup](https://connectycube.com/signup/) and application, obtain credentials:

<img width="1511" alt="Screenshot 2025-06-04 at 10 36 59" src="https://github.com/user-attachments/assets/98862827-619a-4cfc-a847-2a982f562e90" />

Also, go to **Chat -> Custom Fields** and create a new custom field called `externalId`:

<img width="1512" alt="Screenshot 2025-07-02 at 12 24 35" src="https://github.com/user-attachments/assets/868646d2-bdda-4634-aadd-629777cdf24e" />

3.  Add the following code to your `vendure-config.ts` file:

    ```typescript
      import { ChatWidgetPlugin } from '@connectycube/vendure-plugin-chat-widget';

      plugins: [
        ChatWidgetPlugin.init({
           appId: ..., // ConnectyCube App Id
           authKey: "", // ConnectyCube Auth Key
        }),
      ];
    ```

4. Set proper Seller name in **Vendure Dashboard > Settings > Sellers**. The plugin uses Seller entity to identify your store, mainly it's **name** field - this is how your store customers will see your name in chat widget when communicate. So set the proper name of Seller, e.g. **My Awesome Store**. 

#### Multi-vendor Marketplaces

In a case you have [Multi-vendor Marketplace](https://docs.vendure.io/guides/how-to/multi-vendor-marketplaces/), this plugin also can serve well. No extra configuration of plugin is needed.

### Storefront

1. Add chat widget to your Storefront app. For example, let's use [Remix storefront starter](https://github.com/vendure-ecommerce/storefront-remix-starter) as an example:

  ```
    yarn add @connectycube/chat-widget
    yarn connectycube patch-ssr     # Apply SSR patches for Remix to work well
  ```

2. Add the following variables to your `.env` file:

  ```
    CHAT_WIDGET_CONNECTYCUBE_APP_ID=<CONNECTYCUBE APP ID>
    CHAT_WIDGET_CONNECTYCUBE_AUTH_KEY="<CONNECTYCUBE AUTH KEY>
    CHAT_WIDGET_STORE_ID=<YOUR STORE ID>
    CHAT_WIDGET_STORE_NAME=<YOUR STORE NAME>
  ```

3. Create `app/components/ChatWidget.tsx` component with the following content:

  ```typescript
    import { useEffect, useState } from 'react';
    import ConnectyCubeChatWidget from '@connectycube/chat-widget';

    type StoreCustomer = {
      id: string;
      firstName: string;
      lastName: string;
    };

    type StoreProduct = {
      id: string;
      title: string;
    };

    export type ChatWidgetEnv = {
      CHAT_WIDGET_STORE_ID: string;
      CHAT_WIDGET_STORE_NAME: string;
      CHAT_WIDGET_CONNECTYCUBE_APP_ID: string;
      CHAT_WIDGET_CONNECTYCUBE_AUTH_KEY: string;
    };

    export interface ChatWidgetProps {
      customer: StoreCustomer | null;
      product: StoreProduct;
      chatPerProduct?: boolean;
      env: ChatWidgetEnv;
    }

    export default function ChatWidget({
      customer,
      product,
      chatPerProduct,
      env
    }: ChatWidgetProps) {
      const quickActions = {
        title: 'Quick Actions',
        description:
          'Select an action from the options below or type a first message to start a conversation.',
        actions: [
          "Hi, I'm interested in this product.",
          'Can you tell me more about the price and payment options?',
          'Is the product still available?',
          'Can I schedule a viewing?',
        ],
      };

      if (!customer) {
        return null;
      }

      const [defaultChat, setDefaultChat] = useState<any>(null);
      const [isOpen, setIsOpen] = useState<boolean>(false);

      const onOpenCloseWidget = (isOpen: boolean) => {
        setIsOpen(isOpen);
      };

      const storeId = env.CHAT_WIDGET_STORE_ID;
      const storeName = env.CHAT_WIDGET_STORE_NAME;

      useEffect(() => {
        if (isOpen) {
          console.log('Widget is open:', isOpen);
          const defaultChatKey = chatPerProduct ? product.id : storeId;
          const defaultChatName = chatPerProduct ? product.title : storeName;

          setDefaultChat({
            id: defaultChatKey,
            opponentUserId: storeId,
            type: 'group',
            name: defaultChatName,
          });
        }
      }, [isOpen]);

      return (
        <div>
          <ConnectyCubeChatWidget
            // credentials
            appId={env.CHAT_WIDGET_CONNECTYCUBE_APP_ID}
            authKey={env.CHAT_WIDGET_CONNECTYCUBE_AUTH_KEY}
            userId={customer.id}
            userName={`${customer.firstName} ${customer.lastName}`}
            // settings
            showOnlineUsersTab={false}
            splitView={true}
            // quick actions
            quickActions={quickActions}
            // notifications
            showNotifications={true}
            playSound={true}
            // moderation
            enableContentReporting={true}
            enableBlockList={true}
            // last seen
            enableLastSeen={true}
            // url preview
            enableUrlPreview={true}
            limitUrlsPreviews={1}
            // attachments settings
            attachmentsAccept={'image/*,video/*,.pdf,audio/*'}
            // default chat
            defaultChat={defaultChat}
            onOpenChange={onOpenCloseWidget}
          />
        </div>
      );
    }
  ```

4. update `remix.config.js`:

  ```typescript
    const commonConfig = {
      ...
      browserNodeBuiltinsPolyfill: { modules: { events: true } },
    };
  ```

5. Finally, connect `ChatWidget` component on product details page, e.g. `app/routes/products.$slug.tsx`
   
  ```typescript
    import ChatWidget, { ChatWidgetEnv } from '~/components/ChatWidget';

    ...

    export async function loader({ params, request }: DataFunctionArgs) {
      ...

      const { product } = await getProductBySlug(params.slug!, { request });

      const activeCustomer = await getActiveCustomer({ request });

      return json({ product: product!, activeCustomer, ENV: {
        CHAT_WIDGET_STORE_ID: process.env.CHAT_WIDGET_STORE_ID,
        CHAT_WIDGET_STORE_NAME: process.env.CHAT_WIDGET_STORE_NAME,
        CHAT_WIDGET_CONNECTYCUBE_APP_ID:
          process.env.CHAT_WIDGET_CONNECTYCUBE_APP_ID,
        CHAT_WIDGET_CONNECTYCUBE_AUTH_KEY:
          process.env.CHAT_WIDGET_CONNECTYCUBE_AUTH_KEY,
      }})
    }

    export default function ProductSlug() {
      ...

      const { product, activeCustomer, ENV } = useLoaderData<typeof loader>();

      return (
        <div>
          ...

          <ChatWidget
            customer={activeCustomer.activeCustomer!}
            product={{ title: product.name, id: product.id }}
            chatPerProduct={true}
            env={ENV as ChatWidgetEnv}
          />
        </div>
      )
    }
  ```
    
## How can I use it?

On storefront, once logged in and opened product page, there will be a Chat toggle button bottom right where customers can contact the merchant:

<img width="1502" alt="Screenshot 2025-07-02 at 12 14 00" src="https://github.com/user-attachments/assets/d27d7761-0aff-4291-bc34-f27d4eedcb95" />

From Vendure dashboard there will be a new page called Chat, with the widget embedded, where all customers' chats are displayed, so you as a merchant can reply:

<img width="1503" alt="Screenshot 2025-07-02 at 12 13 44" src="https://github.com/user-attachments/assets/9dd3f4ac-b395-4052-a12e-787444a56ab1" />

## Have an issue?

Join our [Discord](https://discord.com/invite/zqbBWNCCFJ) for quick answers to your questions or [file a GitHub issue](https://github.com/ConnectyCube/chat-widget-vendure-plugin/issues) 

## Community

- [Blog](https://connectycube.com/blog)
- X (twitter)[@ConnectyCube](https://x.com/ConnectyCube)
- [Facebook](https://www.facebook.com/ConnectyCube)

## License

Apache 2.0
