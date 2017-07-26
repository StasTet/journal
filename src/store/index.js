import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';


export const configureStore = (initialState) => {
    const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk, logger)));
    
    if (module.hot) {
        module.hot.accept('../reducers', () => store.replaceReducer(rootReducer))
    }

    return store;
}