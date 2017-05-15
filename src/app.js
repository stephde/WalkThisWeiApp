import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text } from 'native-base';

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

function bindAction(dispatch) {
  return {};
}

const mapStateToProps = state => ({
  currentUser: state.users.id
});

export default connect(mapStateToProps, bindAction)(App);
