import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

//https://www.apollographql.com/docs/react/networking/authentication/#cookie
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  credentials: "include",
});

const logoutLink = onError((err) => {
  const errorCode = (err as any)?.graphQLErrors?.[0]?.extensions?.code;
  if (
    ["UNAUTHORIZED", "UNAUTHENTICATED"].includes(errorCode) &&
    err?.operation?.operationName !== "Profile" &&
    !window.location.pathname.includes("/login")
  ) {
    window.location.href = "/login";
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: logoutLink.concat(httpLink),
});

export default client;
