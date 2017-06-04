import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';


import AppNavigator from './components/AppNavigator';
import BleComponent from './components/ble/BleComponent';
import Login from './components/login/Login';

class App extends Component {
  render() {
    const view = !this.props.currentUser ? <Login/> : <AppNavigator history={this.props.history}/>;
    return (
      <View style={{flex: 1}}>
        {view}
        <BleComponent/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.activeUser.id
});

export default connect(mapStateToProps, {})(App);
