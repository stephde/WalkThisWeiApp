'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming';
import { Button, Icon} from 'native-base';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default class MarkerPlayer extends Component {
  constructor () {
    super();
    this.state = {
      isPlaying: false,
      hasBeenStarted: false
    };
  }

  componentWillUnmount () {
    ReactNativeAudioStreaming.stop();
  }

  _onPlayerControllButtonPress () {
      if(this.state.isPlaying) {
        ReactNativeAudioStreaming.pause();
      }
      else {
        if(this.state.hasBeenStarted) {
          ReactNativeAudioStreaming.resume();
        }
        else {
          ReactNativeAudioStreaming.play(this.props.annotation.url, {});
          this.setState({hasBeenStarted: true});
        }
      }
      this.setState({isPlaying: !this.state.isPlaying});
  }

  _getPlayerControlButton () {
    return this.state.isPlaying ? 'ios-pause': 'ios-play';
  }

  _renderPlayerControls () {
    if (this.props.annotation.inDistance) {
      return (
        <View style={{flex:0.5, alignItems:'flex-start'}}>
          <Button transparent onPress={() => this._onPlayerControllButtonPress()}>
            <Icon name={this._getPlayerControlButton()} style={{fontSize: 50, color:'#FFFFFF'}}/>
          </Button>
        </View>
      );
    }
    return (<View style={{flex:0.5, alignItems:'flex-start'}}/>);
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={{flex:0.5, alignItems:'center', justifyContent: 'flex-end'}}>
            <Text style={{color: '#FFFFFF'}}>{this.props.annotation.title}</Text>
            <Text style={{color: '#FFFFFF'}}>{this.props.annotation.description}</Text>
          </View>
          {this._renderPlayerControls()}
        </View>
    );
  }
}
