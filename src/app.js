import React, {Component} from 'react';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { login } from './actions/';
import { Text } from 'native-base';

import AppNavigator from './components/AppNavigator';
import Login from './components/login/Login';
import SplashScreen from './components/splashscreen/SplashScreen'

class App extends Component {

  componentDidMount() {
    this.props.login(DeviceInfo.getUniqueID(), null);
  }

  render() {
    if(this.props.isUserLoading) {
      return (<SplashScreen/>);
    }
    if(!this.props.currentUser) {
      return (<Login/>);
    }
    return <AppNavigator/>
  }
}

function bindAction(dispatch) {
  return {
    login: (deviceId, phone) => dispatch(login(deviceId, phone))
  };
}

const mapStateToProps = state => ({
  currentUser: state.users.id,
  isUserLoading: state.users.loading
});

export default connect(mapStateToProps, bindAction)(App);
