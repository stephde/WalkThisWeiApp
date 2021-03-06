import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { StyleProvider } from 'native-base';
import App from './app';
import configureStore from './configureStore';

function setup() {
  class Root extends Component {
    constructor() {
      super();
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({ isLoading: false })),
      }
    }
    render() {
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      )
    }
  }

  return Root;
}

export default setup;
