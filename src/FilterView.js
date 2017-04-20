
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Content, Container, List, ListItem, Text, CheckBox } from 'native-base';
import { filterChanged } from './actions/index';

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


class FilterView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filters: {
                history: {title: "History"},
                personal: {title: "Personal"},
                stories: {title: "Stories"},
                nature: {title: "Nature"}
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

        this.props.onFilterChanged(key);

    }

    _getFilters() {
        return Object.keys(this.state.filters)
            .map((key) => {
                let checkBox = this.state.filters[key]
                return <ListItem
                                onPress={() => this.checkBoxOnPress(key)}
                                key={key}
                                style={styles.listItem}>
                            <CheckBox
                                onPress={() => this.checkBoxOnPress(key)}
                                checked={this.props.categories.includes(key)}
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

FilterView.propTypes = {
    categories: React.PropTypes.arrayOf(React.PropTypes.string),
    onFilterChanged: React.PropTypes.func
};

function mapStateToProps(state) {
    return {
        categories: state.filter.categories
    }
}

function mapDispatchToProps(dispatch) {

    return {
        onFilterChanged: (key) => dispatch(filterChanged(key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterView)