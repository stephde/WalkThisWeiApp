/**
 * Created by stephde on 04/04/2017.
 */

'use strict';


import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    Button,
    View,
} from 'react-native';

import ApiUtils from './apiUtils';
import { getAnnotations } from './actions';
import { API_URL } from './constants/url.js';

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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseText: 'No request yet...'
        };
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
                    onPress={() => this.props.onAnnotationsClick()}
                />
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'} Cmd+D or shake for dev menu
                </Text>
                {   Object.keys(this.props.annotations)
                    .map((a) =>
                            <Text key={this.props.annotations[a]._id}>
                                { this.props.annotations[a].description }
                            </Text>
                    )
                }
                <Text style={styles.instructions}>

                </Text>
            </View>
        );
    }
}

Home.propTypes = {
    annotations: React.PropTypes.array,
    onAnnotationsClick: React.PropTypes.func.isRequired
}
function mapStateToProps(state) {
    return {
        annotations: state.annotation.annotations
    };
}

function mapDispatchToProps(dispatch){
    return {
        onAnnotationsClick: () => dispatch(getAnnotations()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
