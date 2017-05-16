'use strict';

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container } from 'native-base';

import styles from './styles';

export default class SplashScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.text}>WalkThisWei</Text>
      </Container>
    );
  }
}
