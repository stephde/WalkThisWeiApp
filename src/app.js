
import React, {Component} from 'react';
import {Container, Header, Button, Title, Footer, FooterTab, Icon} from 'native-base';

//import Icon from 'react-native-vector-icons/FontAwesome';

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

    getCurrentTab() {
        console.log("getting current tab");
        switch (this.state.selectedTab) {
            case 'home': return (<Home />);
            case 'search': return (<Search />);
            case 'map': return (<Search />);
        }
    }

    render() {
        return (
            <Container>

                <Header>
                    <Button transparent>
                        <Icon name="person" />
                    </Button>

                    <Title>WalkThisWei</Title>

                    <Button transparent>
                        <Icon name="camera" />
                    </Button>
                </Header>

                {this.getCurrentTab()}

                <Footer>
                    <FooterTab>
                        <Button onclick={() => this.navigateToTab('home')}>
                            <Icon name="apps" />
                        </Button>
                        <Button onclick={() => this.navigateToTab('search')}>
                            <Icon name="person" />
                        </Button>
                        <Button onclick={() => this.navigateToTab('map')}>
                            <Icon name="navigate" />
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}