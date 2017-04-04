/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  TabBarIOS,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let Home = require('./src/home.js');
let Search = require('./src/search.js');

export default class WalkThisWeiApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedTab: 'home'
    };
  }

  navigateToTab(tab) {
      this.setState({
          selectedTab: tab
      });
  }

  render() {
    return (
        <TabBarIOS selectedTab={this.state.selectedTab}>
            <Icon.TabBarItem
                title="Home"
                iconName="home"
                selectedIconName="home"
                selected={this.state.selectedTab === 'home'}
                onPress={() => this.navigateToTab('home')}
            >
                <Home/>
            </Icon.TabBarItem>
            <Icon.TabBarItem
                title="Search"
                iconName="search"
                selectedIconName="search"
                selected={this.state.selectedTab === 'search'}
                onPress={() => this.navigateToTab('search')}
            >
                <Search/>
            </Icon.TabBarItem>
        </TabBarIOS>
    );
  }
}

// Press Cmd+R to reload,{'\n'} Cmd+D or shake for dev menu



AppRegistry.registerComponent('WalkThisWeiApp', () => WalkThisWeiApp);
