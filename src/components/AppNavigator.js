import React, {Component} from 'react';
import { Icon, Text } from 'native-base';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MapChoser from './map/MapChoser';
import UserStoriesContainer from './UserStoriesContainer';
import AllStoriesContainer from './AllStoriesContainer';
import DetailedStoryContainer from './DetailedStoryContainer';
import Profile from './profile/Profile';
import LocationObserver from './LocationObserver';
import { TIME_BETWEEN_LOCATIONS } from '../constants/position';

import {
  setUserLocation,
  setRegion,
  sendUserLocation,
  turnVibrationOn
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

  _getCurrentPosition(enableHighAccuracy) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const region = {
          latitude: latitude,
          longitude: longitude,
        }
        this.props.onUserLocationChange(
          latitude,
          longitude,
          {
            type: enableHighAccuracy ? 'GPS' : 'NETWORK'
          }
        );
        this.props.onRegionChange(region);
      },
      (error) => console.log(error),
      { enableHighAccuracy, timeout: 20000 },
    );
  }

  _setUpLocationWatcher(enableHighAccuracy) {
    return navigator.geolocation.watchPosition(
      (position) => {
        // Create the object to update this.state.mapRegion through the onRegionChange function
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.props.onUserLocationChange(
          position.coords.latitude,
          position.coords.longitude,
          {
            type: enableHighAccuracy ? 'GPS' : 'NETWORK'
          }
        );
      },
      (error) => console.log(error),
      { enableHighAccuracy, timeout: 20000, distanceFilter: 5 }
    );
  }

  componentDidMount() {
    // low Accuracy
    this._getCurrentPosition(false);
    // high Accuracy
    this._getCurrentPosition(true);

    // listen to high accuracy and low accuracy
    this.watchIDGPS = this._setUpLocationWatcher(true);
    this.watchIDNetwork = this._setUpLocationWatcher(false);

    // send location to server
    this.locationTimeout = setInterval(() => {
      this.props.sendUserLocation(
        this.props.userId,
        this.props.userLocation.latitude,
        this.props.userLocation.longitude);
    }, TIME_BETWEEN_LOCATIONS);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchIDGPS);
    navigator.geolocation.clearWatch(this.watchIDNetwork);
    clearInterval(this.locationTimeout);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.currentChapterIndex !== this.props.currentChapterIndex ||
       newProps.currentSubChapterIndex !== this.props.currentSubChapterIndex) {
         newProps.turnVibrationOn();
    }
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
              component={MapChoser}
              title="WalkThisWei"
              hideTabBar
              initial
              rightButtonImage={require('../../images/man-user.png')}
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
              sceneStyle={{backgroundColor: '#FFFFFF'}}
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
  userLocation: React.PropTypes.object,
  sendUserLocation: React.PropTypes.func,
  userId: React.PropTypes.string,
  turnVibrationOn: React.PropTypes.func
}

function mapStateToProps(state) {
  return {
    userLocation: state.position.userLocation,
    userId: state.activeUser.id,
    currentChapterIndex: state.progress.custom.currentChapterIndex,
    currentSubChapterIndex: state.progress.custom.currentSubChapterIndex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRegionChange: (region) => dispatch(setRegion(region)),
    onUserLocationChange: (latitude, longitude, info) => dispatch(setUserLocation(latitude, longitude, info)),
    sendUserLocation: (userId, longitude, latitude) => dispatch(sendUserLocation(userId, latitude, longitude)),
    turnVibrationOn: () => dispatch(turnVibrationOn())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
