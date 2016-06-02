import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

// reducers combined
import reducers from '../reducers/index';

let logger, store;

export default function configureStore(initialState) {
  if ( process.env.NODE_ENV !== 'production' ) {
    logger = createLogger();

    store = createStore(reducers, initialState, applyMiddleware(
      thunk,
      logger
    ));

  } else {
    store = createStore(reducers, initialState, applyMiddleware(
      thunk
    ));
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
