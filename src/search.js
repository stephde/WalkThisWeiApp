/**
 * Created by stephde on 04/04/2017.
 */

'use strict';


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Player } from 'react-native-audio-streaming';

var styles = StyleSheet.create({
    description: {
        fontSize: 20,
        backgroundColor: 'white'
    },
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
               <Player url={"http://lacavewebradio.chickenkiller.com:8000/stream.mp3"} />
            </View>
        );
    }
}
