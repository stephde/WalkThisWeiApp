import React, {Component} from 'react';
import { connect } from 'react-redux';

import AppNavigator from './components/AppNavigator';

import Login from './components/login/Login';

class App extends Component {
  render() {
    if(!this.props.currentUser) {
      return (<Login/>);
    }
    return <AppNavigator/>
  }
}

const mapStateToProps = state => ({
  currentUser: state.activeUser.id
});

export default connect(mapStateToProps, {})(App);
