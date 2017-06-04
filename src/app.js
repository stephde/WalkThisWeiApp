import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';


import AppNavigator from './components/AppNavigator';
import Contact from './components/Contact';
import BleComponent from './components/ble/BleComponent';
import Login from './components/login/Login';

class App extends Component {
  render() {
    const view = !this.props.currentUser ? <Login/> : <AppNavigator/>;
    return (
      <View style={{flex: 1}}>
        {view}
        <BleComponent/>
        <Contact/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.activeUser.id
});

export default connect(mapStateToProps, {})(App);
