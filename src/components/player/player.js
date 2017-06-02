'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import { Button, Icon, Text} from 'native-base';
import Modal from 'react-native-modalbox';
import styles from './styles';
import { connect } from 'react-redux';
import { playerOpened } from '../../actions';

class MarkerPlayer extends Component {
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

  componentWillReceiveProps(newProps) {
    if(newProps.openPlayer !== this.props.openPlayer) {
      if(newProps.openPlayer) {
        this.refs.modal1.open();
        this.props.playerOpened();
      }
    }
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

  _renderModalContent() {
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

  render() {
    return (
      <Modal
        style={styles.modal}
        ref={"modal1"}
        animationDuration={700}
        swipeToClose={true}>
        <Button transparent onPress={() => {this.refs.modal1.close();}}>
          <Icon name="close-circle" style={Object.assign(styles.modalTextColor, styles.modalClosingButton)}/>
        </Button>
        {this._renderModalContent()}
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    openPlayer: state.player.openPlayer,
    annotation: state.player.annotation
  };
}

function mapDispatchToProps(dispatch){
  return {
    playerOpened: () => dispatch(playerOpened())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerPlayer);
