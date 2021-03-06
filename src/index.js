import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './containers/App';

const store = configureStore();

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        </AppContainer>, 
        document.getElementById('root')
    );
}

render();

if(module.hot) {
    module.hot.accept('./containers/App', () => {
        render(require('./containers/App').default);
    });
}