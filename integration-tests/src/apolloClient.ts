import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import fetch from "cross-fetch";
import env from "./env";

export default new ApolloClient({
  link: new HttpLink({
    uri: env.GRAPHQL_API_URL ?? "http://backend:4000/",
    fetch,
  }),
  cache: new InMemoryCache(),
});
