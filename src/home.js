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

import ApiUtils from './apiUtils';

let ApiUrl = 'http://localhost:3000'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            responseText: 'No request yet...'
        };
    }

    callApi(requestParam) {
        fetch(ApiUrl + '/sample?name=' + requestParam + '\'')
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    responseText: responseJson.text
                })
            })
            .catch(function(err) {
                console.log(err)
                this.state.responseText = err
            })
            .done()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome WalkThisWei!
                </Text>
                <Text style={styles.instructions}>
                    To get started click the button below
                </Text>
                <Button
                    style={styles.button}
                    title='Request API'
                    onPress={() => this.callApi('WalkThisWeiApp')}
                >

                </Button>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'} Cmd+D or shake for dev menu
                </Text>
                <Text style={styles.instructions}>
                    {this.state.responseText}
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