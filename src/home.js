/**
 * Created by stephde on 04/04/2017.
 */

'use strict';


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    Button,
    View,
} from 'react-native';


class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome WalkThisWei!
                </Text>
                <Text style={styles.instructions}>
                    To get started click the button below
                </Text>
                <Button style={styles.button} title="Hit Me!" onPress="">
                    Get Started!
                </Button>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'} Cmd+D or shake for dev menu
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        borderColor: '#2222AA',
        borderWidth: 2,
        borderStyle: 'solid',
        backgroundColor: '#BBBBBB'
    },
});

module.exports = Home;