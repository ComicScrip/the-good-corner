import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({ uri: "/graphql" });

const logoutLink = onError(({ networkError }) => {
  if ((networkError as any).statusCode === 401) {
    // redirect
  }
});

//https://www.apollographql.com/docs/react/networking/authentication/#cookie
const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    credentials: "include",
  }),
});

export default client;
