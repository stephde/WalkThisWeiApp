import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from './reducers';

export default function configureStore(onCompletion) {
  const enhancer = composeWithDevTools(
    applyMiddleware(thunk)
  );

  const store = createStore(reducer, enhancer);

  return store;
}
