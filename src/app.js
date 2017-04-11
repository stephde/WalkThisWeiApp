
import React, {Component} from 'react';
import {TabBarIOS} from 'react-native'
import {Container, Header, Button, Title} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './home';
import Search from './search';

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            responseText: 'No request yet...'
        };
    }

    navigateToTab(tab) {
        this.setState({
            selectedTab: tab
        });
    }

    render() {
        return (
            <Container>

                <Header>
                    <Button transparent>
                        <Icon name="xing" />
                    </Button>

                    <Title>WalkThisWei</Title>

                    <Button transparent>
                        <Icon name="gear" />
                    </Button>
                </Header>

                <TabBarIOS selectedTab={this.state.selectedTab}>
                    <Icon.TabBarItem
                        title="Home"
                        iconName="home"
                        selectedIconName="home"
                        selected={this.state.selectedTab === 'home'}
                        onPress={() => this.navigateToTab('home')}
                    >
                        <Home/>
                    </Icon.TabBarItem>
                    <Icon.TabBarItem
                        title="Search"
                        iconName="search"
                        selectedIconName="search"
                        selected={this.state.selectedTab === 'search'}
                        onPress={() => this.navigateToTab('search')}
                    >
                        <Search/>
                    </Icon.TabBarItem>
                </TabBarIOS>

            </Container>
        );
    }
}