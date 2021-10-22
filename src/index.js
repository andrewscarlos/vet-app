import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whiteLIst: ['animals',
  'user',
  'pessoa']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const storePersist = createStore(persistedReducer)
const persistor =  persistStore(storePersist);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}/>
      <App />
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
