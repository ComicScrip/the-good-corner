import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

//https://www.apollographql.com/docs/react/networking/authentication/#cookie
const httpLink = new HttpLink({
  uri: "http://192.168.1.111/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: httpLink,
});

export default client;
