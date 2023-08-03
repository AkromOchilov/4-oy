import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App.jsx';

const client = new ApolloClient({
	link: createUploadLink({
		uri: 'http://localhost:4000/graphql',
	}),
	cache: new InMemoryCache(),
});

ReactDOM.render(
	// <React.StrictMode>
	<ApolloProvider client={client}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ApolloProvider>,
	// </React.StrictMode>,
	document.getElementById('root'),
);
