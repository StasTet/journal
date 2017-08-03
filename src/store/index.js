import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';


export const configureStore = (initialState) => {
    
    const enhancer = composeWithDevTools(applyMiddleware(thunk, logger)); //logger
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}