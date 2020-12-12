import React from 'react';
import ReactDOM from 'react-dom';
import './styles/_base/index.css';
import App from './components/pages/App/App';
import reportWebVitals from './reportWebVitals';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

const httpLink = createHttpLink({ uri: 'http://localhost:4000' });
const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
