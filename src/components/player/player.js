'use strict';

import React, { Component } from 'react';
import { Text, View} from 'react-native';
import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming';
import { Button, Icon} from 'native-base';

import styles from './styles';

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
          <Button transparent onPress={() => this._onPlayerControllButtonPress()}>
            <Icon name={this._getPlayerControlButton()} style={Object.assign({fontSize: 50}, styles.playerTextColor)}/>
          </Button>
      );
    }
    return (<Text style={Object.assign(styles.playerTextColor, {fontSize: 18})}>Too far away. Move closer to listen to the content!</Text>);
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={{flex:0.5, alignItems:'center', justifyContent: 'flex-end'}}>
            <Text style={styles.playerTextColor}>{this.props.annotation.title}</Text>
            <Text style={styles.playerTextColor}>{this.props.annotation.description}</Text>
          </View>
          <View style={{flex:0.5, alignItems:'flex-start', paddingTop: 18}}>
            {this._renderPlayerControls()}
          </View>
        </View>
    );
  }
}
