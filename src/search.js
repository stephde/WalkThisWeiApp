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

class Search extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Search Tab
                </Text>
            </View>
        );
    }
}

module.exports = Search;