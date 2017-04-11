/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import MainView from './src/mainView.js';


export default class WalkThisWeiApp extends Component {


  render() {
    return (
        <MainView>
        </MainView>
    );
  }
}

// Press Cmd+R to reload,{'\n'} Cmd+D or shake for dev menu



AppRegistry.registerComponent('WalkThisWeiApp', () => WalkThisWeiApp);
