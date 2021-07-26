import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import Config from 'react-native-config';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'helpers/session';

const link = new HttpLink({ uri: `${Config.API_URL}graphql` });

const authLink = setContext((_, { headers }) => {
  const user = getSession();

  return {
    headers: {
      ...headers,
      authorization: user ? `Bearer ${user.accessToken}` : '',
    },
  };
});

// Initialize Apollo Client
export const GraphQLClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

export default GraphQLClient;
