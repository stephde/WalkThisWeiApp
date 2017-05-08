'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

var styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
         <Text>Profile</Text>
      </View>
    );
  }
}
