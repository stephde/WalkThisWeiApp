import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux'

export default function configureStore(history) {
  const routerMiddleware = createRouterMiddleware(history);

  const enhancer = composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware
    )
  );

  const store = createStore(reducer, enhancer);

  return store;
}
