import React, {Component} from 'react';
import { Icon, Text } from 'native-base';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MapContainer from './map/MapContainer';
import UserStoriesContainer from './UserStoriesContainer';
import AllStoriesContainer from './AllStoriesContainer';
import DetailedStoryContainer from './DetailedStoryContainer';
import FilterView from './FilterView';
import Profile from './profile/Profile';
import LocationObserver from './LocationObserver';
import {
  setUserLocation,
  setRegion
} from '../actions';
import style from './styles';

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

class AppNavigator extends Component {
  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5,
      }
      this.props.onUserLocationChange(position.coords.latitude, position.coords.longitude);
      this.props.onRegionChange(region);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <LocationObserver>
        <Router
          getSceneStyle={getSceneStyle}
          titleStyle={{
            color: 'white'
          }}
          navigationBarStyle={{
            backgroundColor: '#70C8BE',
          }}
          barButtonIconStyle={{ tintColor: 'white' }}
        >
          <Scene
            key="root"
          >
            <Scene
              key="map"
              component={MapContainer}
              title="WalkThisWei"
              hideTabBar
              initial
              rightButtonImage={require('../../images/user.png')}
              rightButtonIconStyle={style.user}
              onRight={() => Actions.profile()}
            />
            <Scene
              key="storyTabs"
              tabBarStyle={{
                backgroundColor: '#70C8BE',
              }}
              tabTitleStyle={{
                color: 'white'
              }}
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
              key="profile"
              component={Profile}
              hideNavBar={true}
              sceneStyle={{backgroundColor: '#70C8BE'}}
              direction='vertical'
            />
          </Scene>
        </Router>
      </LocationObserver>
    );
  }
}

AppNavigator.propTypes = {
  onRegionChange: React.PropTypes.func,
  onUserLocationChange: React.PropTypes.func,
}

function mapDispatchToProps(dispatch) {
  return {
    onRegionChange: (region) => dispatch(setRegion(region)),
    onUserLocationChange: (latitude, longitude) => dispatch(setUserLocation(latitude, longitude))
  };
}

export default connect(null,mapDispatchToProps)(AppNavigator);
