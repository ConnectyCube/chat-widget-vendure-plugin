import React from "react";
import { useQuery } from "@vendure/admin-ui/react";
import { gql } from "graphql-tag";
import ConnectyCubeChatWidget from "@connectycube/chat-widget"; // dedicated React 18 build

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

export const GET_SELLERS = gql`
  query GetSellers {
    sellers {
      items {
        id
        createdAt
        name
      }
      totalItems
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
  const {
    data: dataConfig,
    loading,
    error,
  } = useQuery<ChatWidgetPluginConfig>(GET_CHAT_WIDGET_PLUGIN_CONFIG);

  const { data: dataSellers, error: errorSellers } =
    useQuery<ChatWidgetPluginConfig>(GET_SELLERS);

  console.log({ dataSellers, errorSellers });

  if (!dataConfig?.chatWidgetPluginConfig) return <div>Loading chat</div>;
  if (error) return <div>Error: {error}</div>;
  const { appId, authKey, storeName, storeId } =
    dataConfig?.chatWidgetPluginConfig;

  const portalStyles: React.CSSProperties = {
    fontWeight: "400",
  };

  const store = {
    id: storeId,
    name: storeName,
  };

  console.log("store", store);

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
