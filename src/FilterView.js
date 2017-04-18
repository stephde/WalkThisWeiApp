
import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { View, Content, Container, List, ListItem, Text, CheckBox } from 'native-base';


var styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    listItem: {
    },
    checkBox: {
        marginRight: 25
    },
    description: {
        padding: 20
    }
};


export default class FilterView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filters: {
                history: {title: "History", checked: true},
                personal: {title: "Personal", checked: true},
                stories: {title: "Stories", checked: false},
                nature: {title: "Nature", checked: false}
            }
        };
    }

    checkBoxOnPress(key) {
        const newValue = ! this.state.filters[key].checked;

        const newState = Object.assign({}, this.state, {
            filters: {
                ...this.state.filters,
                [key]: {
                    ...this.state.filters[key],
                    checked: newValue
                }
            }
        });

        this.setState(newState);
    }

    _getFilters() {
        return Object.keys(this.state.filters)
            .map((key) => {
                let checkBox = this.state.filters[key]
                return <ListItem
                                onPress={() => this.checkBoxOnPress(key)}
                                id={key}
                                style={styles.listItem}>
                            <CheckBox
                                onPress={() => this.checkBoxOnPress(key)}
                                checked={checkBox.checked}
                                style={styles.checkBox}/>
                            <Text>{checkBox.title}</Text>
                        </ListItem>
            })
}

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Please, select the types of content you are interested in:
                </Text>
                <List>
                    {this._getFilters()}
                </List>
            </View>
        );
    }
}