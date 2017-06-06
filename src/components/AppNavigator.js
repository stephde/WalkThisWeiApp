import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Icon, Text, Button } from 'native-base';

import { Route, Switch, Redirect } from 'react-router';
import { NativeRouter, Link } from 'react-router-native'
import { Navigation, Card, Tabs, Tab } from 'react-router-navigation'
import { ConnectedRouter, push } from 'react-router-redux';
import { connect } from 'react-redux';

import MapChoser from './map/MapChoser';
import UserStoriesContainer from './UserStoriesContainer';
import AllStoriesContainer from './AllStoriesContainer';
import DetailedStoryContainer from './DetailedStoryContainer';
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

  _getCurrentPosition(enableHighAccuracy) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        this.props.onUserLocationChange(
          position.coords.latitude,
          position.coords.longitude,
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
        // this.props.onRegionChange(region);
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
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchIDGPS);
    navigator.geolocation.clearWatch(this.watchIDNetwork);
  }

  render() {
    return (
      <LocationObserver>
        <ConnectedRouter history={this.props.history}>
          <Navigation
            backButtonTitle=' '
            backButtonTintColor='#FFFFFF'
            titleStyle={{
              color: '#FFFFFF'
            }}
            navBarStyle={{
              backgroundColor: '#70C8BE'
            }}
            cardStyle={{
              backgroundColor: 'white'
            }}
          >
            <Card
              path="/workaround"
              hideBackButton={true}
              render={() =>
                <Redirect to='/' />
              }
            />
            <Card
              exact
              path="/"
              component={MapChoser}
              title="WalkThisWei"
              hideBackButton={true}
              renderRightButton={() =>
                <TouchableOpacity
                  onPress={() => this.props.navigateToProfile()}
                >
                  <Image
                    source={require('../../images/user.png')}
                    style={style.user}
                    resizeMode='cover'
                  />
                </TouchableOpacity>
              }
            />
            <Card
              path="/profile"
              component={Profile}
              backButtonTitle=' '
              title="Profile"
            />
            <Card
              path="/detailedStory/:id"
              component={DetailedStoryContainer}
              backButtonTitle=' '
              title="Story Details"
            />
            <Card
              path="/stories"
              title="Stories"
              backButtonTitle=' '
              render={({ match, location }) => (
                <Switch location={location}>
                  <Route
                    exact
                    path={match.url}
                    render={
                      () => <Redirect to={`${match.url}/userStories`} />
                    }
                  />
                  <Route
                    render={() => (
                      <Tabs
                        label="WalkThisWei"
                        labelStyle={{ color: 'white' }}
                        tabBarStyle={{ backgroundColor: '#70C8BE' }}
                        tabBarIndicatorStyle={{ backgroundColor: 'white' }}
                      >
                        <Tab
                          path={`${match.url}/userStories`}
                          component={UserStoriesContainer}
                          label="My Stories"
                        />
                        <Tab
                          path={`${match.url}/allStories`}
                          component={AllStoriesContainer}
                          label="All Stories"
                        />
                      </Tabs>
                    )}
                  />
                </Switch>
              )}
            />

          </Navigation>
        </ConnectedRouter>
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
    onUserLocationChange: (latitude, longitude, info) => dispatch(setUserLocation(latitude, longitude, info)),
    navigateToProfile: () => dispatch(push('/profile'))
  };
}

export default connect(null,mapDispatchToProps)(AppNavigator);
       /*       <Scene
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
              </Scene> */
