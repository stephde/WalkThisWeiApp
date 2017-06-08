import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import AppNavigator from './components/AppNavigator';
import Contact from './components/Contact';
import BleComponent from './components/ble/BleComponent';
import Login from './components/login/Login';
import MarkerPlayerContainer from './components/player/PlayerContainer';
import { changeLayout } from './actions/';

class App extends Component {
  render() {
    const view = !this.props.currentUser ? <Login/> : <AppNavigator/>;
    return (
      <View style={{flex: 1}} onLayout={(evt) => {this.props.changeLayout(!this.props.currentChangeLayout)}}>
        {view}
        <BleComponent/>
        <Contact/>
        <MarkerPlayerContainer/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.activeUser.id,
  currentChangeLayout: state.ui.changeLayout
});

function mapDispatchToProps(dispatch){
  return {
    changeLayout: (currentLayout) => dispatch(changeLayout(currentLayout))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
