import React, { useMemo } from "react";
import { useQuery } from "@vendure/admin-ui/react";
import { gql } from "graphql-tag";
import ConnectyCubeChatWidget from "@connectycube/chat-widget/react18"; // dedicated React 18 build
import { useInjector } from "@vendure/admin-ui/react";
import { LocalStorageService } from "@vendure/admin-ui/core";
import { Channel } from "@vendure/core";

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

export const GET_CHANNELS = gql`
  query GetChannels {
    channels {
      items {
        id
        code
        token
        createdAt
        seller {
          id
          name
        }
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

type ChannelsResponse = {
  channels: {
    items: Channel[];
  };
};

export function Chat() {
  // https://docs.vendure.io/guides/extending-the-admin-ui/defining-routes/#injecting-services
  const localStorageService = useInjector(LocalStorageService);

  const activeChannelToken = localStorageService.get("activeChannelToken");
  console.log("[ChatPlugin] activeChannelToken", activeChannelToken);

  const { data: dataConfig, error } = useQuery<ChatWidgetPluginConfig>(
    GET_CHAT_WIDGET_PLUGIN_CONFIG,
  );

  const { data: dataChannels } = useQuery<ChannelsResponse>(GET_CHANNELS);
  console.log("[ChatPlugin] dataChannels", dataChannels);

  const activeSeller = useMemo(() => {
    if (dataChannels) {
      const channel = dataChannels.channels.items.find(
        (channel) => channel.token === activeChannelToken,
      );
      return channel?.seller;
    }
  }, [dataChannels]);

  if (!dataConfig?.chatWidgetPluginConfig) return <div>Loading chat</div>;
  if (error) return <div>Error: {error}</div>;

  const { appId, authKey, storeName, storeId } =
    dataConfig?.chatWidgetPluginConfig;

  const portalStyles: React.CSSProperties = {
    fontWeight: "400",
  };

  const store = {
    id: storeId || (activeSeller ? String(activeSeller.id) : undefined),
    name: storeName || activeSeller?.name,
  };

  if (!store.id) return <div>Loading chat</div>;

  console.log("[ChatPlugin] activeSeller", activeSeller);
  console.log("[ChatPlugin] dataConfig", dataConfig);
  console.log("[ChatPlugin] store", store);

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
