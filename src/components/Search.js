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
               <Player url='https://storage.googleapis.com/walkthisei-audio/test.mp3' />
            </View>
        );
    }
}
