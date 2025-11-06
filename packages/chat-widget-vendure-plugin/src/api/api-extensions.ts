import { gql } from "graphql-tag";

export const adminApiExtensionsTypes = gql`
  extend type Query {
    chatWidgetPluginConfig: ChatWidgetPluginConfig!
  }
  type ChatWidgetPluginConfig {
    authKey: String!
    appId: Int!
    storeName: String
    storeId: String
  }
`;
