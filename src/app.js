
import React, {Component} from 'react';
import { Icon } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';

import MapContainer from './components/map/MapContainer';
import Search from './search';
import FilterView from './FilterView';


const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

export default class App extends Component {
  render() {
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Scene key="root">
          <Scene key="tabbar" tabs={true} hideNavBar={true} tabBarStyle={{ backgroundColor: '#FFFFFF' }}>
            <Scene
              key="map"
              component={MapContainer}
              title="WalkThisWei"
              initial
              icon={() => <Icon name="navigate" />}
            />
            <Scene
              key="filterView"
              component={FilterView}
              title="FilterView"
              icon={() => <Icon name="options" />}
            />
            <Scene
              key="search"
              component={Search}
              title="Search"
              icon={() => <Icon name="ios-musical-note" />}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
