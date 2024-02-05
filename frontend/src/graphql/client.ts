import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { error } from "console";
import { LogoutDocument } from "./generated/schema";

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
    if (errorCode === "UNAUTHENTICATED") {
      alert(
        "Vous n'êtes pas connecté ou votre session a expiré. Merci de vous reconnecter."
      );
      window.location.href = `/login?redirectURLAfterLogin=${window.location.href}`;
    } else if (errorCode === "UNAUTHORIZED") {
      alert(
        "Vous n'avez pas les permissions nécéssaires pour consulter cette partie du site ou effectuer cette action. Vous allez etre déconnecté. Merci de vous reconnecter avec un compte possédant les permissions adéquates."
      );

      client.mutate({ mutation: LogoutDocument }).then(() => {
        client.resetStore();
        window.location.href = `/login?redirectURLAfterLogin=${window.location.href}`;
      });
    }
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
