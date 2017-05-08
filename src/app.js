
import React, {Component} from 'react';
import { Icon, Text } from 'native-base';
import { Router, Scene, ActionConst } from 'react-native-router-flux';

import MapContainer from './components/map/MapContainer';
import UserStoriesContainer from './components/UserStoriesContainer';
import AllStoriesContainer from './components/AllStoriesContainer';
import DetailedStoryContainer from './components/DetailedStoryContainer';
import UserProfile from './components/UserProfile';
import Search from './components/Search';
import FilterView from './components/FilterView';


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

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: 'black'}}>{this.props.title}</Text>
        );
    }
}

export default class App extends Component {
  render() {
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Scene key="root">
          <Scene
            key="map"
            component={MapContainer}
            title="WalkThisWei"
            hideTabBar
            initial
          />
          <Scene
            key="storyTabs"
            tabs
          >
            <Scene
              key="myStories"
              title="My Stories"
              component={UserStoriesContainer}
              icon={TabIcon}
            />
            <Scene
              key="allStories"
              title="All Stories"
              component={AllStoriesContainer}
              icon={TabIcon}
            />
          </Scene>
          <Scene
            key="detailedStory"
            title="Detailed Story"
            component={DetailedStoryContainer}
            hideNavBar={false}
          />
          <Scene
            key="userProfile"
            title="User Profile"
            component={UserProfile}
          />
        </Scene>
      </Router>
    );
  }
}
