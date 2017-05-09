'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

import styles from './styles';

export default class Search extends Component {
  render() {
    return (
      <View style={{paddingTop: 20, flex: 1}}>
        <View style={styles.container}>
          <Button transparent onPress={() => {Actions.pop();}}>
            <Icon name="ios-arrow-back" style={styles.backButton}/>
          </Button>
          <View>
            <Image source={require('../../../images/userLarge.png')} style={styles.user} />
            <Text style={Object.assign({fontSize: 20, paddingTop: 6, textAlign: 'center'}, styles.textColor)}>You</Text>
          </View>
        </View>
        <View style={{paddingLeft: 16, paddingRight: 16}}>
          <View>
            <Text style={Object.assign({fontSize: 20}, styles.textColor)}>Earned Badges</Text>
            <View style={{paddingTop: 8}}>
              <Image source={require('../../../images/badge.png')}/>
            </View>
          </View>
          <View style={{paddingTop: 16}}>
            <Text style={Object.assign({fontSize: 20, paddingBottom: 16}, styles.textColor)}>Walking Stats</Text>
            <Text style={Object.assign({fontSize: 18}, styles.textColor)}>Today’s Distance: 5km (1 h)</Text>
            <Text style={Object.assign({fontSize: 18}, styles.textColor)}>Weekly Distance: 12km (8:20h)</Text>
          </View>
          <View style={{paddingTop: 16}}>
            <Text style={Object.assign({fontSize: 20}, styles.textColor)}>Contacts</Text>
            <View style={{paddingTop: 16, flexDirection: 'row'}}>
              <Image source={require('../../../images/contactf.png')}/>
              <View style={{paddingLeft: 16}}>
                <Text>Lauren</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
