import React, { Component } from 'react';
import { Drawer } from 'native-base';
//import SideBar from './SideBar';
​
export default class Drawer extends Component {
    render() {
        closeDrawer = () => {
            this.drawer.root.close()
        };
        openDrawer = () => {
            this.drawer.root.open()
        };
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar navigator={this.navigator} />}
                onClose={() => this.closeDrawer()} >
                // Main View
                //<SideBar></SideBar>
            </Drawer>
        );
    }
}