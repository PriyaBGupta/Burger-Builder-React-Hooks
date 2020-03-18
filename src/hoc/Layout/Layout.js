import React, { Component } from 'react';
import styles from './Layout.module.css';
import Auxillary from '../Auxillary/Auxillary';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }
    render(){
        return(
        <Auxillary>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer 
            open={this.state.showSideDrawer} 
            closed={this.sideDrawerClosedHandler}/>
            <main className={styles.content}>
                <div>{this.props.children}</div>
            </main>
        </Auxillary>
        );
    }
};
export default Layout;
