'use strict';

import React, { Component } from 'react';
import { Image } from 'react-native';

import styles from './styles';

export default class SplashScreen extends Component {
  render() {
    return (
      <Image style={styles.backgroundImage} source={require('../../../images/background.png')}/>
    );
  }
}
