
import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Header, Button, Title, Footer, FooterTab, Icon} from 'native-base';


import Home from './home';
import Search from './search';
import FilterView from './FilterView';

var styles = {
    headerText: {
        marginLeft: -10,
        marginTop: 7,
        fontSize: 23
    },
    menuButton: {
        left: -80
    }
};

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

    renderCurrentTab() {
        switch (this.state.selectedTab) {
            case 'home': return (<Home />);
            case 'search': return (<FilterView />);
            case 'map': return (<Search />);
        }
    }

    render() {
        return (
            <Container>

                <Header>
                    <Button transparent style={styles.menuButton}>
                        <Icon name="menu" />
                    </Button>

                    <Title style={styles.headerText}>
                        WalkThisWei
                    </Title>
                </Header>

                {this.renderCurrentTab()}

                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.navigateToTab('home')}>
                            <Icon name="apps" />
                        </Button>
                        <Button onPress={() => this.navigateToTab('search')}>
                            <Icon name="person" />
                        </Button>
                        <Button onPress={() => this.navigateToTab('map')}>
                            <Icon name="navigate" />
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}