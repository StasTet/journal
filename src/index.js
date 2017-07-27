import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { AppContainer } from 'react-hot-loader';
import { App } from './components/App';

const store = configureStore();

// class RootApp extends Component {
//   render() {
//     return (
//         <Provider store={store}>
//             <App />
//         </Provider>
//     );
//   }
// }

// ReactDOM.render(
//     <RootApp />,
//     document.getElementById('root')
// )

// if (module.hot) {
//   module.hot.accept();
// }

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App/>
            </Provider>
        </AppContainer>, 
        document.getElementById('root')
    );
}

render();

if(module.hot) {
    module.hot.accept('./components/App', () => {
        render(require('./components/App').default);
    });
}