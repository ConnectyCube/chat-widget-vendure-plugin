import React from "react";
import { useQuery } from "@vendure/admin-ui/react";
import { gql } from "graphql-tag";

export const GET_CHAT_WIDGET_PLUGIN_CONFIG = gql`
  query GET_CHAT_WIDGET_PLUGIN_CONFIG {
    chatWidgetPluginConfig {
      appId
      authKey
    }
  }
`;

type ChatWidgetPluginConfig = {
  chatWidgetPluginConfig: {
    appId: string;
    authKey: string;
  };
};
export function Chat() {
  const { data, loading, error } = useQuery<ChatWidgetPluginConfig>(
    GET_CHAT_WIDGET_PLUGIN_CONFIG,
  );

  if (loading) return <div>Loading config…</div>;
  if (error) return <div>Error: {error}</div>;
  const { appId, authKey } = data?.chatWidgetPluginConfig || {};

  const greeting = "Hello!";
  return (
    <div className="page-block">
      <h2>{greeting}</h2>
    </div>
  );
}
