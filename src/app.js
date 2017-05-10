import React, {Component} from 'react';
import Login from './components/login/Login';
import AppNavigator from './components/AppNavigator';
import { connect } from 'react-redux';

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
  currentUser: state.users.userId,
});

export default connect(mapStateToProps, bindAction)(App);
