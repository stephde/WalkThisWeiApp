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

import MapView from 'react-native-maps';

import ApiUtils from './apiUtils';

let ApiUrl = 'http://localhost:3000'

export default class Home extends Component {

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
                    responseText: responseJson.message
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
              <MapView
                style={ styles.map }
                initialRegion={{
                  latitude: 52.3923,
                  longitude: 13.1239,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
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
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
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
