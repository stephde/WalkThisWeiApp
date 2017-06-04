import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { StyleProvider } from 'native-base';
import App from './app';
import configureStore from './configureStore';
import createHistory from 'history/createMemoryHistory'

function setup() {
  class Root extends Component {
    constructor() {
      super();

      this.history = createHistory()

      this.state = {
        isLoading: false,
        store: configureStore(this.history),
      }
    }
    render() {
      return (
        <Provider store={this.state.store}>
          <App history={this.history}/>
        </Provider>
      )
    }
  }

  return Root;
}

export default setup;
