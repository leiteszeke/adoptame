import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import Config from 'react-native-config';

const link = new HttpLink({ uri: `${Config.API_URL}graphql` });

// Initialize Apollo Client
export const GraphQLClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default GraphQLClient;
