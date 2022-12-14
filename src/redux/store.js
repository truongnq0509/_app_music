import { createStore } from 'redux'
import { persistStore } from 'redux-persist'
import rootReducer from './reducers/rootReducer';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk))
export const persistor = persistStore(store);