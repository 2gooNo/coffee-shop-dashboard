"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface Props extends React.PropsWithChildren {}

const ApolloProviders = ({ children }: Props) => {
  const client = new ApolloClient({
    uri: `http://localhost:8000/api/route`,
    cache: new InMemoryCache(),
  });
  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  );
};

export default ApolloProviders;
