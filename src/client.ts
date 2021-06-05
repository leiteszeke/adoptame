import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const link = new HttpLink({ uri: 'http://192.168.0.19:4000/graphql' });

// Initialize Apollo Client
export const GraphQLClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default GraphQLClient;
