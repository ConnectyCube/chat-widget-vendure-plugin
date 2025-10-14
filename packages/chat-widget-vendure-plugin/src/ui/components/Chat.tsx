import React from "react";
import { useQuery } from "@vendure/admin-ui/react";
import { gql } from "graphql-tag";
import ConnectyCubeChatWidget from "@connectycube/chat-widget/react19";

export const GET_CHAT_WIDGET_PLUGIN_CONFIG = gql`
  query GET_CHAT_WIDGET_PLUGIN_CONFIG {
    chatWidgetPluginConfig {
      appId
      authKey
      storeName
      storeId
    }
  }
`;

type ChatWidgetPluginConfig = {
  chatWidgetPluginConfig: {
    appId: string;
    authKey: string;
    storeName: string;
    storeId: string;
  };
};
export function Chat() {
  const { data, loading, error } = useQuery<ChatWidgetPluginConfig>(
    GET_CHAT_WIDGET_PLUGIN_CONFIG,
  );

  if (!data?.chatWidgetPluginConfig) return <div>Loading chat</div>;
  if (error) return <div>Error: {error}</div>;
  const { appId, authKey, storeName, storeId } = data?.chatWidgetPluginConfig;

  const portalStyles: React.CSSProperties = {
    fontWeight: "400",
  };

  const store = {
    id: storeId,
    name: storeName,
  };

  return (
    <div className="page-block" style={{ height: "calc(100vh - 255px)" }}>
      <ConnectyCubeChatWidget
        appId={appId}
        authKey={authKey}
        userId={store.id}
        userName={store.name}
        splitView={true}
        open={true}
        embedView={true}
        hideWidgetButton={true}
        portalStyle={portalStyles}
        onUnreadCountChange={(count: number) =>
          console.log("unread messages count:", count)
        }
        onOnlineUsersCountChange={(count: number) =>
          console.log("online users count:", count)
        }
      />
    </div>
  );
}
